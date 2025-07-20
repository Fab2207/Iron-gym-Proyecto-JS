export interface Clase {
  id: string;
  nombre: string;
  descripcion?: string;
  idEntrenador: string;
  horario: string;
  cupoMaximo: number;
  cupoActual: number;
  salon?: string;
  activa: boolean;
}

export const hayCuposDisponibles = (clase: Clase): boolean => {
  return clase.cupoActual < clase.cupoMaximo;
};

export const getPorcentajeOcupacion = (clase: Clase): string => {
  if (clase.cupoMaximo === 0) return "0%";
  return `${((clase.cupoActual / clase.cupoMaximo) * 100).toFixed(0)}%`;
};