import { fechaLocalEnZona, sumarMesesCalendario } from './promociones-fechas';

describe('sumarMesesCalendario', () => {
  it('conserva tres meses calendario completos para una fecha regular', () => {
    const inicio = fechaLocalEnZona(2026, 11, 10, 14, 30);
    expect(sumarMesesCalendario(inicio, 3).toISOString()).toBe('2027-02-10T17:30:00.000Z');
  });

  it('ajusta correctamente un fin de mes al último día disponible', () => {
    const inicio = fechaLocalEnZona(2026, 11, 30, 12, 45);
    expect(sumarMesesCalendario(inicio, 3).toISOString()).toBe('2027-02-28T15:45:00.000Z');
  });

  it('mantiene el día 31 cuando el mes de destino lo permite', () => {
    const inicio = fechaLocalEnZona(2026, 12, 31, 9, 0);
    expect(sumarMesesCalendario(inicio, 3).toISOString()).toBe('2027-03-31T12:00:00.000Z');
  });
});
