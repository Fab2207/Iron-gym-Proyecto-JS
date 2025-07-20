// src/types/Cliente.ts
export interface Cliente {
  id: string;
  nombreCompleto: string;
  email: string;
  idMembresia: string;
  telefono?: string;
  fechaNacimiento?: string; 
  fechaRegistro: string; 
}