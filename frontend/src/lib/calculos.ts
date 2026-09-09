export function redondearCalculo(valor: number, decimales = 2) {
  const factor = 10 ** decimales;
  return Math.round((Number.isFinite(valor) ? valor : 0) * factor) / factor;
}

export function calcularProductoNecesario(superficieHa: number, dosisPorHa: number) {
  return redondearCalculo(Math.max(superficieHa, 0) * Math.max(dosisPorHa, 0));
}

export function calcularAguaNecesaria(superficieHa: number, volumenPorHa: number) {
  return redondearCalculo(Math.max(superficieHa, 0) * Math.max(volumenPorHa, 0));
}

export function calcularSemillasNecesarias(
  superficieHa: number,
  plantasDeseadasPorHa: number,
  poderGerminativoPorcentaje: number,
) {
  const germinacion = Math.min(Math.max(poderGerminativoPorcentaje, 0), 100) / 100;
  if (germinacion === 0) return 0;
  return Math.ceil((Math.max(superficieHa, 0) * Math.max(plantasDeseadasPorHa, 0)) / germinacion);
}

export function calcularSemillasPorHaAjustadas(
  plantasDeseadasPorHa: number,
  poderGerminativoPorcentaje: number,
) {
  const germinacion = Math.min(Math.max(poderGerminativoPorcentaje, 0), 100) / 100;
  if (germinacion === 0) return 0;
  return Math.ceil(Math.max(plantasDeseadasPorHa, 0) / germinacion);
}

export function calcularPesoSemillasKg(
  cantidadSemillas: number,
  pesoMilSemillasGramos: number,
) {
  return redondearCalculo(
    (Math.max(cantidadSemillas, 0) * Math.max(pesoMilSemillasGramos, 0)) / 1_000_000,
    2,
  );
}

export function calcularFertilizanteNecesario(superficieHa: number, dosisKgPorHa: number) {
  return redondearCalculo(Math.max(superficieHa, 0) * Math.max(dosisKgPorHa, 0));
}

export function calcularCombustibleNecesario(
  superficieHa: number,
  consumoLitrosPorHa: number,
) {
  return redondearCalculo(
    Math.max(superficieHa, 0) * Math.max(consumoLitrosPorHa, 0),
  );
}

export function calcularCostoCombustible(
  litros: number,
  precioPorLitro: number,
) {
  return redondearCalculo(Math.max(litros, 0) * Math.max(precioPorLitro, 0));
}

export function calcularIngresoEsperado(
  superficieHa: number,
  rendimientoKgHa: number,
  precioPorKg: number,
) {
  return redondearCalculo(
    Math.max(superficieHa, 0) *
      Math.max(rendimientoKgHa, 0) *
      Math.max(precioPorKg, 0),
  );
}

export function calcularCostoTotal(
  superficieHa: number,
  costoPorHa: number,
) {
  return redondearCalculo(Math.max(superficieHa, 0) * Math.max(costoPorHa, 0));
}

export function calcularPuntoEquilibrioKgHa(
  costoPorHa: number,
  precioPorKg: number,
) {
  if (precioPorKg <= 0) return 0;
  return redondearCalculo(Math.max(costoPorHa, 0) / precioPorKg, 2);
}

export function calcularCargaAnimal(cantidadAnimales: number, superficieHa: number) {
  if (superficieHa <= 0) return 0;
  return redondearCalculo(Math.max(cantidadAnimales, 0) / superficieHa, 2);
}
