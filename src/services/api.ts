const API_BASE_URL = 'http://localhost:3000';

import type { Usuario, Cliente, Membresia, Clase, Entrenador, Sucursal, Rutina } from "../types";
import type {
    DatosCreacionUsuario, DatosCreacionCliente, DatosCreacionMembresia,
    DatosCreacionClase, DatosCreacionEntrenador, DatosCreacionSucursal,
    DatosActualizacionCliente, DatosActualizacionMembresia,
    DatosActualizacionClase, DatosActualizacionEntrenador, DatosActualizacionSucursal,
    DatosCreacionRutina, DatosActualizacionRutina
} from "../types";

export const iniciarSesionUsuario = async (email: string, contrasena: string): Promise<Usuario> => {
    const response = await fetch(`${API_BASE_URL}/usuarios?email=${email}&contrasena=${contrasena}`);
    if (!response.ok) {
        throw new Error("Credenciales inválidas.");
    }
    const usuarios = await response.json();
    if (usuarios.length === 0) {
        throw new Error("Usuario no encontrado o credenciales inválidas.");
    }
    return usuarios[0] as Usuario;
};

export const registrarUsuario = async (datos: DatosCreacionUsuario): Promise<Usuario> => {
    const id = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    

    const usuarioCompleto = {
        ...datos,
        id
    };
    
    const response = await fetch(`${API_BASE_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioCompleto),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrar usuario.");
    }
    const usuarioCreado = await response.json();
    
    // Si el rol es cliente, también crear entrada en la tabla clientes
    if (datos.rol === 'client') {
        const clienteId = `client-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const clienteData = {
            id: clienteId,
            nombreCompleto: datos.nombre || 'Cliente',
            email: datos.email,
            telefono: '',
            idMembresia: 'basica', // Membresía por defecto
            fechaNacimiento: '',
            fechaRegistro: new Date().toISOString().split('T')[0]
        };
        
        try {
            await fetch(`${API_BASE_URL}/clientes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(clienteData),
            });
        } catch (error) {
            console.error('Error al crear entrada de cliente:', error);
        }
    }
    
    return usuarioCreado as Usuario;
};

export const getAllClients = async (): Promise<Cliente[]> => {
    const response = await fetch(`${API_BASE_URL}/clientes`);
    if (!response.ok) {
        throw new Error("Error al obtener clientes.");
    }
    const data = await response.json();
    return data as Cliente[];
};

export const getClienteById = async (id: string): Promise<Cliente> => {
    const response = await fetch(`${API_BASE_URL}/clientes/${id}`);
    if (!response.ok) {
        throw new Error("Error al obtener cliente por ID.");
    }
    const data = await response.json();
    return data as Cliente;
};

export const registrarCliente = async (datos: DatosCreacionCliente): Promise<Cliente> => {
    const response = await fetch(`${API_BASE_URL}/clientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrar cliente.");
    }
    const clienteCreado = await response.json();
    return clienteCreado as Cliente;
};

export const actualizarCliente = async (id: string, datos: DatosActualizacionCliente): Promise<Cliente> => {
    const response = await fetch(`${API_BASE_URL}/clientes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar cliente.");
    }
    const clienteActualizado = await response.json();
    return clienteActualizado as Cliente;
};

export const eliminarCliente = async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/clientes/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar cliente.");
    }
};

export const getAllMembresias = async (): Promise<Membresia[]> => {
    const response = await fetch(`${API_BASE_URL}/membresias`);
    if (!response.ok) {
        throw new Error("Error al obtener membresías.");
    }
    const data = await response.json();
    return data as Membresia[];
};

export const crearNuevaMembresia = async (datos: DatosCreacionMembresia): Promise<Membresia> => {
    const response = await fetch(`${API_BASE_URL}/membresias`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear membresía.");
    }
    const membresiaCreada = await response.json();
    return membresiaCreada as Membresia;
};

export const actualizarDatosMembresia = async (id: string, datos: DatosActualizacionMembresia): Promise<Membresia> => {
    const response = await fetch(`${API_BASE_URL}/membresias/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar membresía.");
    }
    const membresiaActualizada = await response.json();
    return membresiaActualizada as Membresia;
};

export const eliminarMembresia = async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/membresias/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar membresía.");
    }
};

export const getAllClases = async (): Promise<Clase[]> => {
    const response = await fetch(`${API_BASE_URL}/clases`);
    if (!response.ok) {
        throw new Error("Error al obtener clases.");
    }
    const data = await response.json();
    return data as Clase[];
};

export const getClaseById = async (id: string): Promise<Clase> => {
    const response = await fetch(`${API_BASE_URL}/clases/${id}`);
    if (!response.ok) {
        throw new Error("Error al obtener clase por ID.");
    }
    const data = await response.json();
    return data as Clase;
};


export const crearNuevaClase = async (datos: DatosCreacionClase): Promise<Clase> => {
    const response = await fetch(`${API_BASE_URL}/clases`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear clase.");
    }
    const claseCreada = await response.json();
    return claseCreada as Clase;
};

export const actualizarDatosClase = async (id: string, datos: DatosActualizacionClase): Promise<Clase> => {
    const response = await fetch(`${API_BASE_URL}/clases/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar clase.");
    }
    const claseActualizada = await response.json();
    return claseActualizada as Clase;
};

export const eliminarClase = async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/clases/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar clase.");
    }
};

export const obtenerRutinas = async (): Promise<Rutina[]> => {
    const response = await fetch(`${API_BASE_URL}/rutinas`);
    if (!response.ok) {
        throw new Error("Error al obtener rutinas.");
    }
    const data = await response.json();
    return data as Rutina[];
};

export const getRutinaById = async (id: string): Promise<Rutina> => {
    const response = await fetch(`${API_BASE_URL}/rutinas/${id}`);
    if (!response.ok) {
        throw new Error("Error al obtener rutina por ID.");
    }
    const data = await response.json();
    return data as Rutina;
};

export const crearNuevaRutina = async (datos: DatosCreacionRutina): Promise<Rutina> => {
    const response = await fetch(`${API_BASE_URL}/rutinas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear rutina.");
    }
    const rutinaCreada = await response.json();
    return rutinaCreada as Rutina;
};

export const actualizarRutina = async (id: string, datos: DatosActualizacionRutina): Promise<Rutina> => {
    const response = await fetch(`${API_BASE_URL}/rutinas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar rutina.");
    }
    const rutinaActualizada = await response.json();
    return rutinaActualizada as Rutina;
};

export const eliminarRutina = async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/rutinas/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar rutina.");
    }
};

export const obtenerClasesPorEntrenador = async (idEntrenador: string): Promise<Clase[]> => {
    const response = await fetch(`${API_BASE_URL}/clases?idEntrenador=${idEntrenador}`);
    if (!response.ok) {
        throw new Error("Error al obtener clases del entrenador.");
    }
    const data = await response.json();
    return data as Clase[];
};

export const getAllEntrenadores = async (): Promise<Entrenador[]> => {
    const response = await fetch(`${API_BASE_URL}/entrenadores`);
    if (!response.ok) {
        throw new Error("Error al obtener entrenadores.");
    }
    const data = await response.json();
    return data as Entrenador[];
};

export const crearNuevoEntrenador = async (datos: DatosCreacionEntrenador): Promise<Entrenador> => {
    const response = await fetch(`${API_BASE_URL}/entrenadores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear entrenador.");
    }
    const entrenadorCreado = await response.json();
    return entrenadorCreado as Entrenador;
};

export const actualizarDatosEntrenador = async (id: string, datos: DatosActualizacionEntrenador): Promise<Entrenador> => {
    const response = await fetch(`${API_BASE_URL}/entrenadores/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar entrenador.");
    }
    const entrenadorActualizado = await response.json();
    return entrenadorActualizado as Entrenador;
};

export const eliminarEntrenador = async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/entrenadores/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar entrenador.");
    }
};

export const getAllSucursales = async (): Promise<Sucursal[]> => {
    const response = await fetch(`${API_BASE_URL}/sucursales`);
    if (!response.ok) {
        throw new Error("Error al obtener sucursales.");
    }
    const data = await response.json();
    return data as Sucursal[];
};

export const crearNuevaSucursal = async (datos: DatosCreacionSucursal): Promise<Sucursal> => {
    const response = await fetch(`${API_BASE_URL}/sucursales`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear sucursal.");
    }
    const sucursalCreada = await response.json();
    return sucursalCreada as Sucursal;
};

export const actualizarDatosSucursal = async (id: string, datos: DatosActualizacionSucursal): Promise<Sucursal> => {
    const response = await fetch(`${API_BASE_URL}/sucursales/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar sucursal.");
    }
    const sucursalActualizada = await response.json();
    return sucursalActualizada as Sucursal;
};

export const eliminarSucursal = async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/sucursales/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar sucursal.");
    }
};