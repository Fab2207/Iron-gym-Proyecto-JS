import React, { useState, useEffect } from "react";
import { getAllClases, eliminarClase, getAllEntrenadores } from "../../services/api";
import type { Clase } from "../../types/Clase";
import { getPorcentajeOcupacion } from "../../types/Clase";
import type { Entrenador } from "../../types/Entrenador";
import { FormularioClase } from "../../components/administracion/FormularioClase";

const GestionClases: React.FC = () => {
  const [clases, setClases] = useState<Clase[]>([]);
  const [entrenadores, setEntrenadores] = useState<Entrenador[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [claseEditando, setClaseEditando] = useState<Clase | undefined>(
    undefined
  );
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarDatosIniciales();
  }, []);

  const cargarDatosIniciales = async () => {
    setCargando(true);
    setError(null);
    try {
      const [clasesData, entrenadoresData] = await Promise.all([
        getAllClases(),
        getAllEntrenadores(),
      ]);
      setClases(clasesData);
      setEntrenadores(entrenadoresData);
    } catch (error: any) {
      setError(error.message || "Error al cargar los datos iniciales.");
    } finally {
      setCargando(false);
    }
  };

  const cargarClases = async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await getAllClases();
      setClases(data);
    } catch (error: any) {
      setError(error.message || "Error al cargar las clases.");
    } finally {
      setCargando(false);
    }
  };


  const manejarNuevaClase = () => {
    setClaseEditando(undefined);
    setMostrarFormulario(true);
  };

  const manejarEditarClase = (clase: Clase) => {
    setClaseEditando(clase);
    setMostrarFormulario(true);
  };

  const manejarExitoFormulario = () => {
    setMostrarFormulario(false);
    setClaseEditando(undefined);
    cargarClases();
  };

  const manejarCancelarFormulario = () => {
    setMostrarFormulario(false);
    setClaseEditando(undefined);
  };

  const manejarEliminarClase = async (id: string) => {
    if (window.confirm("¿Está seguro de que desea eliminar esta clase?")) {
      setCargando(true);
      setError(null);
      try {
        await eliminarClase(id);
        alert("Clase eliminada exitosamente.");
        cargarClases();
      } catch (error: any) {
        setError(error.message || "Error al eliminar la clase.");
      } finally {
        setCargando(false);
      }
    }
  };

  const getNombreEntrenador = (idEntrenador: string): string => {
    const entrenador = entrenadores.find(ent => ent.id === idEntrenador);
    return entrenador ? entrenador.nombreCompleto : "Desconocido";
  };

  const clasesFiltradas = clases.filter(
    (clase) =>
      clase.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      clase.horario.toLowerCase().includes(busqueda.toLowerCase()) ||
      clase.salon?.toLowerCase().includes(busqueda.toLowerCase()) ||
      getNombreEntrenador(clase.idEntrenador).toLowerCase().includes(busqueda.toLowerCase())
  );

  if (mostrarFormulario) {
    return (
      <div className="container-fluid p-4">
        <FormularioClase
          claseExistente={claseEditando}
          onGuardar={manejarExitoFormulario}
          onCancelar={manejarCancelarFormulario}
          entrenadores={entrenadores}
        />
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary fw-bold">
          <i className="bi bi-calendar-check me-2"></i>
          Gestión de Clases
        </h3>
        <button className="btn btn-primary" onClick={manejarNuevaClase}>
          <i className="bi bi-plus-circle me-1"></i>
          Nueva Clase
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
              placeholder="Buscar por nombre, horario o entrenador..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 text-end">
          <span className="text-muted">
            Total de clases: <strong>{clases.length}</strong>
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
            <span className="visually-hidden">Cargando clases...</span>
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
                    <th>Entrenador</th>
                    <th>Horario</th>
                    <th>Cupo</th>
                    <th>Salón</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clasesFiltradas.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-4 text-muted">
                        {busqueda
                          ? "No se encontraron clases que coincidan con la búsqueda."
                          : "No hay clases registradas."}
                      </td>
                    </tr>
                  ) : (
                    clasesFiltradas.map((clase) => (
                      <tr key={clase.id}>
                        <td>
                          <strong>{clase.nombre}</strong>
                        </td>
                        <td>{getNombreEntrenador(clase.idEntrenador)}</td>
                        <td>{clase.horario}</td>
                        <td>
                          {clase.cupoActual}/{clase.cupoMaximo} (
                          {getPorcentajeOcupacion(clase)})
                        </td>
                        <td>{clase.salon || "N/A"}</td>
                        <td>
                          <span
                            className={`badge bg-${
                              clase.activa ? "success" : "danger"
                            }`}
                          >
                            {clase.activa ? "Activa" : "Inactiva"}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => manejarEditarClase(clase)}
                              title="Editar clase"
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => manejarEliminarClase(clase.id)}
                              title="Eliminar clase"
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

export default GestionClases;