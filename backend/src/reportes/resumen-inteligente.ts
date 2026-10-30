export type NivelHallazgoReporte = 'POSITIVO' | 'INFORMACION' | 'ATENCION' | 'CRITICO';

export type HallazgoInteligenteReporte = {
  id: string;
  nivel: NivelHallazgoReporte;
  titulo: string;
  descripcion: string;
  accionSugerida?: string;
};

type DatosResumenInteligente = {
  actividad: { completadas: number; pendientes: number; vencidas: number };
  maquinaria: { mantenimientos: number; gastosRegistrados: number };
  finanzas: {
    ingresos: number;
    egresos: number;
    saldo: number;
    costosEstimados: number;
    costosReales: number;
    desvioCostos: number;
    comparacionAnterior: { saldo: number | null } | null;
  } | null;
  alertas: { total: number; prioritarias: number };
};

export function generarResumenInteligente(datos: DatosResumenInteligente) {
  const hallazgos: HallazgoInteligenteReporte[] = [];
  const agregar = (hallazgo: HallazgoInteligenteReporte) => hallazgos.push(hallazgo);

  if (datos.alertas.prioritarias > 0) {
    agregar({
      id: 'alertas-prioritarias',
      nivel: 'CRITICO',
      titulo: 'Alertas prioritarias pendientes',
      descripcion: `Hay ${datos.alertas.prioritarias} alerta${datos.alertas.prioritarias === 1 ? '' : 's'} que requiere${datos.alertas.prioritarias === 1 ? '' : 'n'} atención inmediata.`,
      accionSugerida: 'Revisá las alertas y definí una acción responsable para cada una.',
    });
  }

  if (datos.actividad.vencidas > 0) {
    agregar({
      id: 'trabajos-vencidos',
      nivel: datos.actividad.vencidas >= 3 ? 'CRITICO' : 'ATENCION',
      titulo: 'Trabajos fuera de fecha',
      descripcion: `Hay ${datos.actividad.vencidas} trabajo${datos.actividad.vencidas === 1 ? '' : 's'} vencido${datos.actividad.vencidas === 1 ? '' : 's'}.`,
      accionSugerida: 'Reasigná fechas o responsables antes de planificar nuevas tareas.',
    });
  }

  if (datos.finanzas) {
    if (datos.finanzas.saldo < 0) {
      agregar({
        id: 'saldo-negativo',
        nivel: 'CRITICO',
        titulo: 'Saldo operativo negativo',
        descripcion: `Los egresos del período superan a los ingresos por $${Math.abs(datos.finanzas.saldo).toLocaleString('es-AR')}.`,
        accionSugerida: 'Revisá los egresos registrados y priorizá los pagos operativos.',
      });
    }

    if (datos.finanzas.costosEstimados > 0 && datos.finanzas.desvioCostos > 0) {
      const desvioPorcentual = (datos.finanzas.desvioCostos / datos.finanzas.costosEstimados) * 100;
      if (desvioPorcentual >= 10) {
        agregar({
          id: 'desvio-costos',
          nivel: desvioPorcentual >= 25 ? 'CRITICO' : 'ATENCION',
          titulo: 'Costos por encima de lo estimado',
          descripcion: `Los costos reales están ${Math.round(desvioPorcentual)}% por encima de lo planificado.`,
          accionSugerida: 'Compará insumos, mano de obra y maquinaria para identificar el desvío.',
        });
      }
    }

    if ((datos.finanzas.comparacionAnterior?.saldo ?? 0) <= -20) {
      agregar({
        id: 'saldo-en-baja',
        nivel: 'ATENCION',
        titulo: 'El saldo bajó frente al período anterior',
        descripcion: `El saldo operativo varió ${datos.finanzas.comparacionAnterior?.saldo}% frente al período anterior.`,
        accionSugerida: 'Revisá qué ingresos o egresos explican el cambio antes del próximo cierre.',
      });
    }
  } else {
    agregar({
      id: 'sin-finanzas',
      nivel: 'INFORMACION',
      titulo: 'Resumen económico no disponible',
      descripcion: 'Tu perfil no tiene acceso a Finanzas para este informe.',
    });
  }

  if (datos.actividad.completadas > 0 && datos.actividad.vencidas === 0) {
    agregar({
      id: 'ritmo-operativo',
      nivel: 'POSITIVO',
      titulo: 'Buen ritmo operativo',
      descripcion: `Se completaron ${datos.actividad.completadas} trabajos sin tareas vencidas al cierre.`,
    });
  }

  if (!datos.alertas.total && !datos.actividad.vencidas && !hallazgos.some((hallazgo) => hallazgo.nivel === 'CRITICO' || hallazgo.nivel === 'ATENCION')) {
    agregar({
      id: 'sin-riesgos',
      nivel: 'POSITIVO',
      titulo: 'Sin riesgos operativos detectados',
      descripcion: 'No se identificaron alertas ni desvíos que requieran atención en este cierre.',
    });
  }

  const nivelGeneral: NivelHallazgoReporte = hallazgos.some((hallazgo) => hallazgo.nivel === 'CRITICO')
    ? 'CRITICO'
    : hallazgos.some((hallazgo) => hallazgo.nivel === 'ATENCION')
      ? 'ATENCION'
      : hallazgos.some((hallazgo) => hallazgo.nivel === 'POSITIVO')
        ? 'POSITIVO'
        : 'INFORMACION';
  const resumen = {
    CRITICO: 'Hay situaciones prioritarias que conviene resolver antes de avanzar.',
    ATENCION: 'El período requiere seguimiento en algunos puntos operativos o económicos.',
    POSITIVO: 'El período cierra con indicadores operativos favorables.',
    INFORMACION: 'El análisis se genera con los datos y permisos disponibles para tu perfil.',
  }[nivelGeneral];

  return {
    nivelGeneral,
    resumen,
    hallazgos: hallazgos.slice(0, 5),
    generadoCon: 'Reglas automáticas basadas en la información registrada al cierre del período.',
  };
}
