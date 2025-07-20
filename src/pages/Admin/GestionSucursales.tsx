import React, { useState, useEffect } from "react";
import { getAllSucursales, eliminarSucursal } from "../../services/api";
import type{ Sucursal } from "../../types";
import FormularioSucursal from "../../components/administracion/FormularioSucursal";

const GestionSucursales: React.FC = () => {
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [sucursalEditando, setSucursalEditando] = useState<
    Sucursal | undefined
  >(undefined);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarSucursales();
  }, []);

  const cargarSucursales = async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await getAllSucursales();
      setSucursales(data);
    } catch (error: any) {
      setError(error.message || "Error al cargar las sucursales.");
    } finally {
      setCargando(false);
    }
  };

  const manejarNuevaSucursal = () => {
    setSucursalEditando(undefined);
    setMostrarFormulario(true);
  };

  const manejarEditarSucursal = (sucursal: Sucursal) => {
    setSucursalEditando(sucursal);
    setMostrarFormulario(true);
  };

  const manejarExitoFormulario = () => {
    setMostrarFormulario(false);
    setSucursalEditando(undefined);
    cargarSucursales();
  };

  const manejarCancelarFormulario = () => {
    setMostrarFormulario(false);
    setSucursalEditando(undefined);
  };

  const manejarEliminarSucursal = async (id: string) => {
    if (window.confirm("¿Está seguro de que desea eliminar esta sucursal?")) {
      setCargando(true);
      setError(null);
      try {
        await eliminarSucursal(id);
        alert("Sucursal eliminada exitosamente.");
        cargarSucursales();
      } catch (error: any) {
        setError(error.message || "Error al eliminar la sucursal.");
      } finally {
        setCargando(false);
      }
    }
  };

  const sucursalesFiltradas = sucursales.filter(
    (sucursal) =>
      sucursal.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      sucursal.direccion.toLowerCase().includes(busqueda.toLowerCase()) ||
      sucursal.telefono.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (mostrarFormulario) {
    return (
      <div className="container-fluid p-4">
        <FormularioSucursal
          sucursal={sucursalEditando}
          alGuardar={manejarExitoFormulario}
          alCancelar={manejarCancelarFormulario}
        />
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary fw-bold">
          <i className="bi bi-shop me-2"></i>
          Gestión de Sucursales
        </h3>
        <button className="btn btn-primary" onClick={manejarNuevaSucursal}>
          <i className="bi bi-plus-circle me-1"></i>
          Nueva Sucursal
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
              placeholder="Buscar por nombre, dirección o teléfono..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 text-end">
          <span className="text-muted">
            Total de sucursales: <strong>{sucursales.length}</strong>
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
            <span className="visually-hidden">Cargando sucursales...</span>
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
                    <th>Dirección</th>
                    <th>Teléfono</th>
                    <th>Horario</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {sucursalesFiltradas.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-muted">
                        {busqueda
                          ? "No se encontraron sucursales que coincidan con la búsqueda."
                          : "No hay sucursales registradas."}
                      </td>
                    </tr>
                  ) : (
                    sucursalesFiltradas.map((sucursal) => (
                      <tr key={sucursal.id}>
                        <td>
                          <strong>{sucursal.nombre}</strong>
                        </td>
                        <td>{sucursal.direccion}</td>
                        <td>{sucursal.telefono}</td>
                        <td>{sucursal.horarioAtencion}</td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => manejarEditarSucursal(sucursal)}
                              title="Editar sucursal"
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() =>
                                manejarEliminarSucursal(sucursal.id)
                              }
                              title="Eliminar sucursal"
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

export default GestionSucursales;
