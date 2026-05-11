import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaService } from '../prisma/prisma.service';
import { ChatMessageDto } from './dto/ai.dto';

const MODEL_NAME = 'gemini-2.5-flash-lite';

const SYSTEM_BASE = `Sos AgroBot, un asistente agrícola especializado en el mercado argentino.
Sos experto en cultivos pampeanos (soja, maíz, trigo, girasol), ganadería bovina, gestión de establecimientos rurales, 
costos, financiamiento agropecuario y clima en Argentina.
Respondés siempre en español rioplatense, de forma concisa y práctica.
Si te preguntan algo que no tiene relación con agro, ganadería o finanzas del campo, indicá amablemente que solo podés ayudar con esos temas.`;

const INSIGHTS_PROMPT = `Analizá los datos del establecimiento y devolvé EXACTAMENTE un array JSON con 3 a 4 insights prácticos.
Formato obligatorio (SOLO el JSON, sin markdown ni texto extra):
[
  {"tipo":"warning|info|success|tip","titulo":"...","texto":"..."}
]
- "warning": algo urgente o negativo
- "success": algo positivo
- "info": dato neutral relevante
- "tip": recomendación proactiva
- Máximo 2 oraciones por insight. Usá datos concretos del establecimiento.
- Nunca uses genérico como "tenés X campos". Sé específico con nombres, montos y fechas.`;

@Injectable()
export class AiService {
  constructor(private prisma: PrismaService) {}

  // ─── Chat ──────────────────────────────────────────────────────────────────
  async chat(
    userId: number,
    history: ChatMessageDto[],
    message: string,
  ): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey)
      throw new InternalServerErrorException('GEMINI_API_KEY no configurada');

    const context = await this.buildContext(userId);
    const systemInstruction = `${SYSTEM_BASE}\n\nDatos del establecimiento del usuario:\n${context}`;

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: MODEL_NAME,
        systemInstruction,
      });

      const chat = model.startChat({
        history: history.map((m) => ({
          role: m.role,
          parts: [{ text: m.text }],
        })),
        generationConfig: { maxOutputTokens: 600 },
      });

      const result = await chat.sendMessage(message);
      return result.response.text();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new InternalServerErrorException(`Error Gemini: ${msg}`);
    }
  }

  // ─── Insights automáticos ──────────────────────────────────────────────────
  async insights(
    userId: number,
  ): Promise<{ tipo: string; titulo: string; texto: string }[]> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey)
      throw new InternalServerErrorException('GEMINI_API_KEY no configurada');

    const context = await this.buildContext(userId);
    const prompt = `${INSIGHTS_PROMPT}\n\nDatos del establecimiento:\n${context}\n\nFecha actual: ${new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`;

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: MODEL_NAME,
        generationConfig: { maxOutputTokens: 500, temperature: 0.4 },
      });

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();

      // Strip potential markdown fences
      const cleaned = text
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/```\s*$/i, '')
        .trim();
      return JSON.parse(cleaned) as {
        tipo: string;
        titulo: string;
        texto: string;
      }[];
    } catch {
      return [
        {
          tipo: 'info',
          titulo: 'Asistente listo',
          texto:
            'AgroBot está disponible para analizar tu establecimiento. Hacé clic en el chat para empezar.',
        },
      ];
    }
  }

  // ─── Context builder ───────────────────────────────────────────────────────
  private async buildContext(userId: number): Promise<string> {
    const [campos, siembras, animales, tareas, finanzas] = await Promise.all([
      this.prisma.campo.findMany({
        where: { usuarioId: userId },
        include: { lotes: true },
      }),
      this.prisma.siembra.findMany({
        where: { lote: { campo: { usuarioId: userId } } },
        include: {
          tipoCultivo: true,
          lote: { include: { campo: true } },
          cosechas: true,
        },
        orderBy: { fechaSiembra: 'desc' },
        take: 10,
      }),
      this.prisma.animal.findMany({
        where: { usuarioId: userId },
        include: { preneces: { where: { estado: 'EN_CURSO' } } },
      }),
      this.prisma.tareaRural.findMany({
        where: { usuarioId: userId, estado: { in: ['PENDIENTE', 'EN_CURSO'] } },
        include: { campo: { select: { nombre: true } } },
        orderBy: { fechaProgramada: 'asc' },
        take: 15,
      }),
      this.prisma.movimientoFinanciero.findMany({
        where: {
          usuarioId: userId,
          fecha: { gte: new Date(new Date().getFullYear(), 0, 1) },
        },
      }),
    ]);

    const totalHa = campos.reduce((a, c) => a + c.hectareas, 0);
    const totalLotes = campos.reduce((a, c) => a + c.lotes.length, 0);

    const siembrasActivas = siembras.filter((s) => s.estado === 'EN_CURSO');
    const siembrasDesc = siembrasActivas
      .map(
        (s) =>
          `${s.tipoCultivo.nombre} en ${s.lote.nombre} (${s.lote.campo.nombre}), sembrado el ${new Date(s.fechaSiembra).toLocaleDateString('es-AR')}`,
      )
      .join('; ');

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const vencidas = tareas.filter((t) => new Date(t.fechaProgramada) < hoy);
    const proximas = tareas
      .filter((t) => new Date(t.fechaProgramada) >= hoy)
      .slice(0, 5);
    const tareasDesc = proximas
      .map(
        (t) =>
          `"${t.titulo}" (${t.prioridad}) el ${new Date(t.fechaProgramada).toLocaleDateString('es-AR')}${t.campo ? ` en ${t.campo.nombre}` : ''}`,
      )
      .join('; ');

    const prenecesActivas = animales.reduce(
      (a, an) => a + an.preneces.length,
      0,
    );

    const ingresos = finanzas
      .filter((f) => f.tipo === 'INGRESO')
      .reduce((a, f) => a + f.monto, 0);
    const egresos = finanzas
      .filter((f) => f.tipo === 'EGRESO')
      .reduce((a, f) => a + f.monto, 0);
    const saldo = ingresos - egresos;

    const totalKgCosechado = siembras.reduce(
      (a, s) => a + s.cosechas.reduce((b, c) => b + c.totalKg, 0),
      0,
    );

    return `
ESTABLECIMIENTO:
- Campos: ${campos.map((c) => `${c.nombre} (${c.hectareas} ha, ${c.lotes.length} lotes${c.ubicacion ? `, ${c.ubicacion}` : ''})`).join('; ')}
- Total: ${totalHa.toLocaleString('es-AR')} ha en ${totalLotes} lotes

SIEMBRAS:
- Activas (${siembrasActivas.length}): ${siembrasDesc || 'Ninguna'}
- Total kg cosechado este año: ${totalKgCosechado.toLocaleString('es-AR')} kg

GANADERÍA:
- Animales: ${animales.length} cabezas
- Preñeces activas: ${prenecesActivas}

TAREAS:
- Vencidas: ${vencidas.length}${vencidas.length > 0 ? ` → ${vencidas.map((t) => `"${t.titulo}"`).join(', ')}` : ''}
- Próximas: ${tareasDesc || 'Ninguna'}

FINANZAS (año ${new Date().getFullYear()}):
- Ingresos: $${ingresos.toLocaleString('es-AR')}
- Egresos: $${egresos.toLocaleString('es-AR')}
- Saldo: $${saldo.toLocaleString('es-AR')} (${saldo >= 0 ? 'positivo' : 'NEGATIVO'})
    `.trim();
  }
}
