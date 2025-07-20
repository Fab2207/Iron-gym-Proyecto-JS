import type { RolUsuario } from "./index";

export interface Usuario {
  id: string;
  email: string;
  contrasena?: string;
  rol: RolUsuario;
  nombre: string;
}

export const esAdministrador = (usuario: Usuario): boolean => {
  return usuario.rol === "admin";
};

export const esRecepcionista = (usuario: Usuario): boolean => {
  return usuario.rol === "receptionist";
};

export const esCliente = (usuario: Usuario): boolean => {
  return usuario.rol === "client";
};

export const esEntrenador = (usuario: Usuario): boolean => {
  return usuario.rol === "trainer";
};

export const esUsuarioValido = (usuario: Usuario): boolean => {
  return usuario.rol !== null && usuario.email !== "";
};

const capitalizeFirstLetter = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getNombreUsuario = (usuario: Usuario): string => {
  return usuario.nombre || capitalizeFirstLetter(usuario.email.split("@")[0]);
};