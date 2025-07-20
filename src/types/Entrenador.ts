export interface Entrenador {
  id: string;
  nombreCompleto: string;
  email: string;
  telefono?: string;
  especialidad: string;
  biografia?: string;
  activo: boolean;
}

export const getBioCorta = (entrenador: Entrenador, maxLength: number = 100): string => {
  if (!entrenador.biografia) return "";
  return entrenador.biografia.length > maxLength
    ? `${entrenador.biografia.substring(0, maxLength)}...`
    : entrenador.biografia;
};

export const getMailtoLink = (entrenador: Entrenador): string => {
  return `mailto:${entrenador.email}`;
};