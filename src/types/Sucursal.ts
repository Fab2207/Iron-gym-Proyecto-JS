export interface Sucursal {
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;
  horarioAtencion: string;
}

export const getDireccionParaMapa = (sucursal: Sucursal): string => {
  return encodeURIComponent(sucursal.direccion);
};

export const estaAbiertaAhora = (sucursal: Sucursal, horaActual: number): boolean => {
  const [horasInicio, horasFin] = sucursal.horarioAtencion
    .match(/(\d{1,2}:\d{2})-(\d{1,2}:\d{2})/)?.[0]
    ?.split("-")
    .map((h) => parseInt(h.split(":")[0])) || [0, 24];
  return horaActual >= horasInicio && horaActual < horasFin;
};