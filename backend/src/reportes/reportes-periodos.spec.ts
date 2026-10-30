import {
  periodoMensualCerrado,
  periodoSemanalCerrado,
  ZONA_HORARIA_REPORTES_DEFAULT,
} from './reportes-periodos';

describe('periodos de reportes', () => {
  it('calcula la semana cerrada anterior en Argentina', () => {
    const periodo = periodoSemanalCerrado(
      new Date('2026-01-05T15:00:00.000Z'),
      ZONA_HORARIA_REPORTES_DEFAULT,
    );

    expect(periodo.desde.toISOString()).toBe('2025-12-29T03:00:00.000Z');
    expect(periodo.hasta.toISOString()).toBe('2026-01-05T03:00:00.000Z');
    expect(periodo.cerrado).toBe(true);
  });

  it('calcula el mes cerrado anterior sin mezclar años', () => {
    const periodo = periodoMensualCerrado(
      new Date('2026-01-15T15:00:00.000Z'),
      ZONA_HORARIA_REPORTES_DEFAULT,
    );

    expect(periodo.desde.toISOString()).toBe('2025-12-01T03:00:00.000Z');
    expect(periodo.hasta.toISOString()).toBe('2026-01-01T03:00:00.000Z');
    expect(periodo.cerrado).toBe(true);
  });
});
