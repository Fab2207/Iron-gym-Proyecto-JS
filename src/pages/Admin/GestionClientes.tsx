import React, { useState, useEffect } from "react";
import { getAllClients, createClient, actualizarCliente, eliminarCliente } from "../../services/api";
import type { Cliente } from "../../types/Cliente";
import type { Membresia } from "../../types/Membresia";
import type { DatosCreacionCliente, DatosActualizacionCliente } from "../../types";
import FormularioCliente from "../../components/administracion/FormularioCliente";

const GestionClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [clienteEditando, setClienteEditando] = useState<Cliente | undefined>(undefined);
  const [busqueda, setBusqueda] = useState("");
  const [membresias, setMembresias] = useState<Membresia[]>([]);

  useEffect(() => {
    cargarClientes();
    cargarMembresias();
  }, []);

  const cargarClientes = async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await getAllClients();
      setClientes(data);
    } catch (error: any) {
      setError(error.message || "Error al cargar los clientes.");
    } finally {
      setCargando(false);
    }
  };

  const cargarMembresias = async () => {
    try {
      const dataMembresias: Membresia[] = [
        {
          id: "basica",
          nombre: "Básica",
          descripcion: "Acceso limitado al gimnasio",
          precio: 20,
          duracionEnDias: 30,
          activa: true,
        },
        {
          id: "intermedia",
          nombre: "Intermedia",
          descripcion: "Acceso a clases grupales",
          precio: 35,
          duracionEnDias: 90,
          activa: true,
        },
        {
          id: "premium",
          nombre: "Premium",
          descripcion: "Acceso total y entrenador personal",
          precio: 50,
          duracionEnDias: 365,
          activa: true,
        },
      ];
      setMembresias(dataMembresias);
    } catch (error: any) {
      console.error("Error al cargar membresías:", error);
    }
  };

  const manejarNuevoCliente = () => {
    setClienteEditando(undefined);
    setMostrarFormulario(true);
  };

  const manejarEditarCliente = (cliente: Cliente) => {
    setClienteEditando(cliente);
    setMostrarFormulario(true);
  };

  const manejarGuardarCliente = async (datos: DatosCreacionCliente | DatosActualizacionCliente) => {
    try {
      if (clienteEditando) {
        await actualizarCliente(clienteEditando.id, datos as DatosActualizacionCliente);
      } else {
        await createClient(datos as DatosCreacionCliente);
      }
      setMostrarFormulario(false);
      setClienteEditando(undefined);
      cargarClientes();
    } catch (error: any) {
      setError(error.message || "Error al guardar el cliente.");
      console.error("Error al guardar:", error);
    }
  };

  const manejarEliminarCliente = async (id: string) => {
    if (window.confirm('¿Está seguro de eliminar este cliente? Esta acción es irreversible.')) {
      try {
        await eliminarCliente(id);
        cargarClientes();
      } catch (error: any) {
        setError(error.message || "Error al eliminar el cliente.");
        console.error("Error al eliminar:", error);
      }
    }
  };

  const manejarCancelarFormulario = () => {
    setMostrarFormulario(false);
    setClienteEditando(undefined);
  };

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nombreCompleto.toLowerCase().includes(busqueda.toLowerCase()) ||
    cliente.email.toLowerCase().includes(busqueda.toLowerCase()) ||
    cliente.idMembresia.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (mostrarFormulario) {
    return (
      <div className="container-fluid p-4">
        <FormularioCliente
          clienteExistente={clienteEditando}
          onGuardar={manejarGuardarCliente}
          onCancelar={manejarCancelarFormulario}
          membresias={membresias}
        />
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary fw-bold">
          <i className="bi bi-person-lines-fill me-2"></i>
          Gestión de Clientes
        </h3>
        <button
          className="btn btn-primary"
          onClick={manejarNuevoCliente}
        >
          <i className="bi bi-person-plus me-1"></i>
          Nuevo Cliente
        </button>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre, email o membresía..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 text-end">
          <span className="text-muted">
            Total de clientes: <strong>{clientes.length}</strong>
          </span>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}

      {cargando ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando clientes...</span>
          </div>
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-primary">
                  <tr>
                    <th>Nombre Completo</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Membresía</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clientesFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-muted">
                        {busqueda ? "No se encontraron clientes que coincidan con la búsqueda." : "No hay clientes registrados."}
                      </td>
                    </tr>
                  ) : (
                    clientesFiltrados.map((cliente) => (
                      <tr key={cliente.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="avatar-sm bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2">
                              {cliente.nombreCompleto.charAt(0).toUpperCase()}
                            </div>
                            <strong>{cliente.nombreCompleto}</strong>
                          </div>
                        </td>
                        <td>{cliente.email}</td>
                        <td>{cliente.telefono || "N/A"}</td>
                        <td>
                          <span className={`badge ${
                            cliente.idMembresia === "premium" ? "bg-warning" :
                            cliente.idMembresia === "intermedia" ? "bg-info" : "bg-secondary"
                          }`}>
                            {membresias.find(m => m.id === cliente.idMembresia)?.nombre || cliente.idMembresia}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => manejarEditarCliente(cliente)}
                              title="Editar cliente"
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button
                              className="btn btn-outline-info"
                              title="Ver historial"
                              onClick={() => alert('Función de historial próximamente')}
                            >
                              <i className="bi bi-clock-history"></i>
                            </button>
                            <button
                              className="btn btn-outline-success"
                              title="Marcar asistencia"
                              onClick={() => alert('Función de marcar asistencia próximamente')}
                            >
                              <i className="bi bi-check-circle"></i>
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              title="Eliminar cliente"
                              onClick={() => manejarEliminarCliente(cliente.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionClientes;