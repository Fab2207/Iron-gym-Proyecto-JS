import React, { useState, useEffect } from "react";
import { getAllMembresias, eliminarMembresia } from "../../services/api";
import type { Membresia } from "../../types/Membresia";
import FormularioMembresia from "../../components/administracion/FormularioMembresia";

const GestionMembresias: React.FC = () => {
  const [membresias, setMembresias] = useState<Membresia[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [membresiaEditando, setMembresiaEditando] = useState<
    Membresia | undefined
  >(undefined);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarMembresias();
  }, []);

  const cargarMembresias = async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await getAllMembresias();
      setMembresias(data);
    } catch (error: any) {
      setError(error.message || "Error al cargar las membresías.");
    } finally {
      setCargando(false);
    }
  };

  const manejarNuevaMembresia = () => {
    setMembresiaEditando(undefined);
    setMostrarFormulario(true);
  };

  const manejarEditarMembresia = (membresia: Membresia) => {
    setMembresiaEditando(membresia);
    setMostrarFormulario(true);
  };

  const manejarExitoFormulario = () => {
    setMostrarFormulario(false);
    setMembresiaEditando(undefined);
    cargarMembresias();
  };

  const manejarCancelarFormulario = () => {
    setMostrarFormulario(false);
    setMembresiaEditando(undefined);
  };

  const manejarEliminarMembresia = async (id: string) => {
    if (window.confirm("¿Está seguro de que desea eliminar esta membresía?")) {
      setCargando(true);
      setError(null);
      try {
        await eliminarMembresia(id);
        alert("Membresía eliminada exitosamente.");
        cargarMembresias();
      } catch (error: any) {
        setError(error.message || "Error al eliminar la membresía.");
      } finally {
        setCargando(false);
      }
    }
  };

  const membresiasFiltradas = membresias.filter(
    (membresia) =>
      membresia.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      membresia.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (mostrarFormulario) {
    return (
      <div className="container-fluid p-4">
        <FormularioMembresia
          membresiaExistente={membresiaEditando}
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
          <i className="bi bi-wallet-fill me-2"></i>
          Gestión de Membresías
        </h3>
        <button className="btn btn-primary" onClick={manejarNuevaMembresia}>
          <i className="bi bi-plus-circle me-1"></i>
          Nueva Membresía
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
              placeholder="Buscar por nombre o descripción..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 text-end">
          <span className="text-muted">
            Total de membresías: <strong>{membresias.length}</strong>
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
            <span className="visually-hidden">Cargando membresías...</span>
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
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Duración (Días)</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {membresiasFiltradas.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-4 text-muted">
                        {busqueda
                          ? "No se encontraron membresías que coincidan con la búsqueda."
                          : "No hay membresías registradas."}
                      </td>
                    </tr>
                  ) : (
                    membresiasFiltradas.map((membresia) => (
                      <tr key={membresia.id}>
                        <td>
                          <strong>{membresia.nombre}</strong>
                        </td>
                        <td>{membresia.descripcion}</td>
                        <td>${membresia.precio.toFixed(2)}</td>
                        <td>{membresia.duracionEnDias}</td>
                        <td>
                          <span
                            className={`badge bg-${
                              membresia.activa ? "success" : "danger"
                            }`}
                          >
                            {membresia.activa ? "Activa" : "Inactiva"}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => manejarEditarMembresia(membresia)}
                              title="Editar membresía"
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() =>
                                manejarEliminarMembresia(membresia.id)
                              }
                              title="Eliminar membresía"
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

export default GestionMembresias;
