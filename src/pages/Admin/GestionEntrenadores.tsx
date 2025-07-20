import React, { useState, useEffect } from "react";
import { getAllEntrenadores, eliminarEntrenador } from "../../services/api";
import type { Entrenador } from "../../types/Entrenador";
import FormularioEntrenador from "../../components/administracion/FormularioEntrenador";

const GestionEntrenadores: React.FC = () => {
  const [entrenadores, setEntrenadores] = useState<Entrenador[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [entrenadorEditando, setEntrenadorEditando] = useState<
    Entrenador | undefined
  >(undefined);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarEntrenadores();
  }, []);

  const cargarEntrenadores = async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await getAllEntrenadores();
      setEntrenadores(data);
    } catch (error: any) {
      setError(error.message || "Error al cargar los entrenadores.");
    } finally {
      setCargando(false);
    }
  };

  const manejarNuevoEntrenador = () => {
    setEntrenadorEditando(undefined);
    setMostrarFormulario(true);
  };

  const manejarEditarEntrenador = (entrenador: Entrenador) => {
    setEntrenadorEditando(entrenador);
    setMostrarFormulario(true);
  };

  const manejarExitoFormulario = () => {
    setMostrarFormulario(false);
    setEntrenadorEditando(undefined);
    cargarEntrenadores();
  };

  const manejarCancelarFormulario = () => {
    setMostrarFormulario(false);
    setEntrenadorEditando(undefined);
  };

  const manejarEliminarEntrenador = async (id: string) => {
    if (
      window.confirm("¿Está seguro de que desea eliminar a este entrenador?")
    ) {
      setCargando(true);
      setError(null);
      try {
        await eliminarEntrenador(id);
        alert("Entrenador eliminado exitosamente.");
        cargarEntrenadores();
      } catch (error: any) {
        setError(error.message || "Error al eliminar el entrenador.");
      } finally {
        setCargando(false);
      }
    }
  };

  const entrenadoresFiltrados = entrenadores.filter(
    (entrenador) =>
      entrenador.nombreCompleto
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      entrenador.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      entrenador.especialidad.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (mostrarFormulario) {
    return (
      <div className="container-fluid p-4">
        <FormularioEntrenador
          entrenadorExistente={entrenadorEditando}
          onGuardar={manejarExitoFormulario}
          onCancelar={manejarCancelarFormulario}
        />
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary fw-bold">
          <i className="bi bi-person-badge me-2"></i>
          Gestión de Entrenadores
        </h3>
        <button className="btn btn-primary" onClick={manejarNuevoEntrenador}>
          <i className="bi bi-plus-circle me-1"></i>
          Nuevo Entrenador
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
              placeholder="Buscar por nombre, email o especialidad..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 text-end">
          <span className="text-muted">
            Total de entrenadores: <strong>{entrenadores.length}</strong>
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
            <span className="visually-hidden">Cargando entrenadores...</span>
          </div>
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-primary">
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Especialidad</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {entrenadoresFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-4 text-muted">
                        {busqueda
                          ? "No se encontraron entrenadores que coincidan con la búsqueda."
                          : "No hay entrenadores registrados."}
                      </td>
                    </tr>
                  ) : (
                    entrenadoresFiltrados.map((entrenador) => (
                      <tr key={entrenador.id}>
                        <td>
                          <strong>{entrenador.nombreCompleto}</strong>
                        </td>
                        <td>{entrenador.email}</td>
                        <td>{entrenador.telefono || "N/A"}</td>
                        <td>{entrenador.especialidad}</td>
                        <td>
                          <span
                            className={`badge bg-${
                              entrenador.activo ? "success" : "danger"
                            }`}
                          >
                            {entrenador.activo ? "Activo" : "Inactivo"}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-primary"
                              onClick={() =>
                                manejarEditarEntrenador(entrenador)
                              }
                              title="Editar entrenador"
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() =>
                                manejarEliminarEntrenador(entrenador.id)
                              }
                              title="Eliminar entrenador"
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

export default GestionEntrenadores;
