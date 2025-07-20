export interface Membresia {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  duracionEnDias: number;
  activa: boolean;
}

export const getPrecioMensualEstimado = (membresia: Membresia): number => {
  if (membresia.duracionEnDias <= 30) {
    return membresia.precio;
  }
  return parseFloat((membresia.precio / (membresia.duracionEnDias / 30)).toFixed(2));
};

export const esAnual = (membresia: Membresia): boolean => {
  return membresia.duracionEnDias >= 365;
};