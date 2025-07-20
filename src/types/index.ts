export type RolUsuario = "admin" | "receptionist" | "client" | "trainer";

export interface Usuario {
  id: string;
  email: string;
  rol: RolUsuario;
  nombre: string;
  contrasena?: string;
}

export interface Cliente {
  id: string;
  nombreCompleto: string;
  email: string;
  telefono?: string;
  idMembresia: string;
  fechaNacimiento?: string;
  fechaRegistro?: string;
}

export interface Membresia {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  duracionEnDias: number;
  activa: boolean;
}

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

export interface Entrenador {
  id: string;
  nombreCompleto: string;
  email: string;
  telefono?: string;
  especialidad: string;
  biografia?: string;
  activo: boolean;
}

export interface Sucursal {
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;
  horarioAtencion: string;
}

export interface Rutina {
  id: string;
  nombre: string;
  descripcion: string;
  idEntrenador?: string;
  idCliente?: string;
  nivel?: string;
  duracionSemanas?: number;
  duracionMinutos?: number;
  ejercicios?: Array<{
    nombre: string;
    series: number;
    repeticiones: string | number;
    descansoSegundos?: number;
    duracionMinutos?: number;
    intensidad?: string;
  }>;
}

export interface DatosCreacionUsuario {
  email: string;
  contrasena: string;
  rol: RolUsuario;
  nombre?: string;
}

export interface DatosCreacionCliente {
  nombreCompleto: string;
  email: string;
  telefono?: string;
  idMembresia: string;
  fechaNacimiento?: string;
}

export interface DatosCreacionMembresia {
  nombre: string;
  descripcion: string;
  precio: number;
  duracionEnDias: number;
  activa: boolean;
}

export interface DatosCreacionClase {
  nombre: string;
  descripcion?: string;
  idEntrenador: string;
  horario: string;
  cupoMaximo: number;
  cupoActual: number;
  salon?: string;
  activa: boolean;
}

export interface DatosCreacionEntrenador {
  nombreCompleto: string;
  email: string;
  telefono?: string;
  especialidad: string;
  biografia?: string;
  activo: boolean;
}

export interface DatosCreacionSucursal {
  nombre: string;
  direccion: string;
  telefono: string;
  horarioAtencion: string;
}

export type DatosCreacionRutina = Omit<Rutina, 'id'>;

export interface DatosActualizacionUsuario {
  email?: string;
  contrasena?: string;
  rol?: RolUsuario;
  nombre?: string;
}

export interface DatosActualizacionCliente {
  nombreCompleto?: string;
  email?: string;
  telefono?: string;
  idMembresia?: string;
  fechaNacimiento?: string;
  fechaRegistro?: string;
}

export interface DatosActualizacionMembresia {
  nombre?: string;
  descripcion?: string;
  precio?: number;
  duracionEnDias?: number;
  activa?: boolean;
}

export interface DatosActualizacionClase {
  nombre?: string;
  descripcion?: string;
  idEntrenador?: string;
  horario?: string;
  cupoMaximo?: number;
  cupoActual?: number;
  salon?: string;
  activa?: boolean;
}

export interface DatosActualizacionEntrenador {
  nombreCompleto?: string;
  email?: string;
  telefono?: string;
  especialidad?: string;
  biografia?: string;
  activo?: boolean;
}

export interface DatosActualizacionSucursal {
  nombre?: string;
  direccion?: string;
  telefono?: string;
  horarioAtencion?: string;
}

export type DatosActualizacionRutina = Partial<Omit<Rutina, 'id'>>;