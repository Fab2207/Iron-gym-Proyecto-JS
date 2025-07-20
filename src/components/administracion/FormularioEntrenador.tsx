import React, { useState, useEffect } from "react";
import type {
  DatosCreacionEntrenador,
  DatosActualizacionEntrenador,
} from "../../types";
import type { Entrenador } from "../../types/Entrenador";

interface FormularioEntrenadorProps {
  entrenadorExistente?: Entrenador;
  onGuardar: (
    datos: DatosCreacionEntrenador | DatosActualizacionEntrenador
  ) => void;
  onCancelar: () => void;
}

const FormularioEntrenador: React.FC<FormularioEntrenadorProps> = ({
  entrenadorExistente,
  onGuardar,
  onCancelar,
}) => {
  const [nombreCompleto, setNombreCompleto] = useState(
    entrenadorExistente?.nombreCompleto || ""
  );
  const [email, setEmail] = useState(entrenadorExistente?.email || "");
  const [especialidad, setEspecialidad] = useState(
    entrenadorExistente?.especialidad || ""
  );
  const [telefono, setTelefono] = useState(entrenadorExistente?.telefono || "");
  const [biografia, setBiografia] = useState(
    entrenadorExistente?.biografia || ""
  );
  const [activo, setActivo] = useState(entrenadorExistente?.activo || false);

  useEffect(() => {
    if (entrenadorExistente) {
      setNombreCompleto(entrenadorExistente.nombreCompleto);
      setEmail(entrenadorExistente.email);
      setEspecialidad(entrenadorExistente.especialidad);
      setTelefono(entrenadorExistente.telefono || "");
      setBiografia(entrenadorExistente.biografia || "");
      setActivo(entrenadorExistente.activo);
    } else {
      setNombreCompleto("");
      setEmail("");
      setEspecialidad("");
      setTelefono("");
      setBiografia("");
      setActivo(false);
    }
  }, [entrenadorExistente]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const datos: DatosCreacionEntrenador | DatosActualizacionEntrenador = {
      nombreCompleto,
      email,
      especialidad,
      telefono: telefono || undefined, // Enviar undefined si está vacío
      biografia: biografia || undefined, // Enviar undefined si está vacío
      activo,
    };
    onGuardar(datos);
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">
          {entrenadorExistente ? "Editar Entrenador" : "Crear Nuevo Entrenador"}
        </h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombreCompleto" className="form-label">
              Nombre Completo:
            </label>
            <input
              type="text"
              className="form-control"
              id="nombreCompleto"
              value={nombreCompleto}
              onChange={(e) => setNombreCompleto(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="especialidad" className="form-label">
              Especialidad:
            </label>
            <input
              type="text"
              className="form-control"
              id="especialidad"
              value={especialidad}
              onChange={(e) => setEspecialidad(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">
              Teléfono:
            </label>
            <input
              type="text"
              className="form-control"
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="biografia" className="form-label">
              Biografía:
            </label>
            <textarea
              className="form-control"
              id="biografia"
              value={biografia}
              onChange={(e) => setBiografia(e.target.value)}
              rows={3}
            ></textarea>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="activo"
              checked={activo}
              onChange={(e) => setActivo(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="activo">
              Activo:
            </label>
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary me-2">
              Guardar
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancelar}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioEntrenador;
