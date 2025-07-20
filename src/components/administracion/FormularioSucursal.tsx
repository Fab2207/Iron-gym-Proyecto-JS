import React, { useState, useEffect } from "react";
import type {
  Sucursal,
  DatosCreacionSucursal,
  DatosActualizacionSucursal,
} from "../../types";
import {
  crearNuevaSucursal,
  actualizarDatosSucursal,
} from "../../services/api";
interface FormularioSucursalProps {
  sucursal?: Sucursal;
  alGuardar: () => void;
  alCancelar: () => void;
}

const FormularioSucursal: React.FC<FormularioSucursalProps> = ({
  sucursal,
  alGuardar,
  alCancelar,
}) => {
  const [nombre, setNombre] = useState(sucursal?.nombre || "");
  const [direccion, setDireccion] = useState(sucursal?.direccion || "");
  const [telefono, setTelefono] = useState(sucursal?.telefono || "");
  const [horarioAtencion, setHorarioAtencion] = useState(
    sucursal?.horarioAtencion || ""
  );
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setNombre(sucursal?.nombre || "");
    setDireccion(sucursal?.direccion || "");
    setTelefono(sucursal?.telefono || "");
    setHorarioAtencion(sucursal?.horarioAtencion || "");
    setError(null);
  }, [sucursal]);

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setError(null);

    if (!nombre || !direccion || !telefono || !horarioAtencion) {
      setError("Todos los campos son obligatorios.");
      setCargando(false);
      return;
    }

    try {
      if (sucursal) {
        const datosActualizacion: DatosActualizacionSucursal = {
          nombre,
          direccion,
          telefono,
          horarioAtencion,
        };
        await actualizarDatosSucursal(sucursal.id, datosActualizacion);
        alert("Sucursal actualizada exitosamente.");
      } else {
        const datosCreacion: DatosCreacionSucursal = {
          nombre,
          direccion,
          telefono,
          horarioAtencion,
        };
        await crearNuevaSucursal(datosCreacion);
        alert("Sucursal creada exitosamente.");
      }
      alGuardar();
    } catch (err: unknown) {
      let mensajeError = "Error al guardar la sucursal.";
      if (err instanceof Error) {
        mensajeError = err.message;
      }
      setError(mensajeError);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h4 className="card-title text-primary mb-4">
        {sucursal ? "Editar Sucursal" : "Crear Nueva Sucursal"}
      </h4>
      {error && (
        <div className="alert alert-danger mb-3">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}
      <form onSubmit={manejarEnvio}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            disabled={cargando}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">
            Dirección
          </label>
          <input
            type="text"
            className="form-control"
            id="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            disabled={cargando}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">
            Teléfono
          </label>
          <input
            type="text"
            className="form-control"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            disabled={cargando}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="horarioAtencion" className="form-label">
            Horario de Atención
          </label>
          <input
            type="text"
            className="form-control"
            id="horarioAtencion"
            value={horarioAtencion}
            onChange={(e) => setHorarioAtencion(e.target.value)}
            placeholder="Ej: L-V 8am-9pm, S 9am-2pm"
            disabled={cargando}
            required
          />
        </div>
        <div className="d-flex justify-content-end mt-4">
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={alCancelar}
            disabled={cargando}
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary" disabled={cargando}>
            {cargando ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Guardando...
              </>
            ) : sucursal ? (
              "Actualizar Sucursal"
            ) : (
              "Crear Sucursal"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioSucursal;
