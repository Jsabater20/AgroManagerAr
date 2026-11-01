import { generarResumenInteligente } from './resumen-inteligente';

describe('generarResumenInteligente', () => {
  const base = {
    actividad: { completadas: 4, pendientes: 1, vencidas: 0 },
    maquinaria: { mantenimientos: 1, gastosRegistrados: 1 },
    finanzas: {
      ingresos: 100000,
      egresos: 80000,
      saldo: 20000,
      costosEstimados: 40000,
      costosReales: 42000,
      desvioCostos: 2000,
      comparacionAnterior: { saldo: 5 },
    },
    alertas: { total: 0, prioritarias: 0 },
  };

  it('marca como crítico un saldo negativo y alertas prioritarias', () => {
    const resumen = generarResumenInteligente({
      ...base,
      finanzas: { ...base.finanzas, saldo: -35000 },
      alertas: { total: 2, prioritarias: 1 },
    });

    expect(resumen.nivelGeneral).toBe('CRITICO');
    expect(resumen.hallazgos.map((hallazgo) => hallazgo.id)).toEqual(
      expect.arrayContaining(['saldo-negativo', 'alertas-prioritarias']),
    );
  });

  it('no expone conclusiones financieras si no se recibieron finanzas', () => {
    const resumen = generarResumenInteligente({ ...base, finanzas: null });

    expect(resumen.hallazgos.map((hallazgo) => hallazgo.id)).toContain('sin-finanzas');
    expect(resumen.hallazgos.map((hallazgo) => hallazgo.id)).not.toContain('saldo-negativo');
  });
});
