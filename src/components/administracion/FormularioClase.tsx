import React, { useState, useEffect } from 'react';
import type { DatosCreacionClase, DatosActualizacionClase } from '../../types';
import type{ Clase } from '../../types/Clase';
import type{ Entrenador } from '../../types/Entrenador';
import { crearNuevaClase, actualizarDatosClase } from '../../services/api';

interface FormularioClaseProps {
  claseExistente?: Clase;
  onGuardar: (datos: DatosCreacionClase | DatosActualizacionClase) => void;
  onCancelar: () => void;
  entrenadores: Entrenador[];
}

export const FormularioClase: React.FC<FormularioClaseProps> = ({ claseExistente, onGuardar, onCancelar, entrenadores }) => {
  const [nombre, setNombre] = useState(claseExistente?.nombre || '');
  const [descripcion, setDescripcion] = useState(claseExistente?.descripcion || '');
  const [idEntrenador, setIdEntrenador] = useState(claseExistente?.idEntrenador || '');
  const [horario, setHorario] = useState(claseExistente?.horario || '');
  const [cupoMaximo, setCupoMaximo] = useState(claseExistente?.cupoMaximo || 0);
  const [cupoActual, setCupoActual] = useState(claseExistente?.cupoActual || 0);
  const [salon, setSalon] = useState(claseExistente?.salon || '');
  const [activa, setActiva] = useState(claseExistente?.activa || false);

  useEffect(() => {
    if (claseExistente) {
      setNombre(claseExistente.nombre);
      setDescripcion(claseExistente.descripcion || '');
      setIdEntrenador(claseExistente.idEntrenador);
      setHorario(claseExistente.horario);
      setCupoMaximo(claseExistente.cupoMaximo);
      setCupoActual(claseExistente.cupoActual);
      setSalon(claseExistente.salon || '');
      setActiva(claseExistente.activa);
    }
  }, [claseExistente]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (claseExistente) {
      // Actualizar clase existente
      const datosActualizacion: DatosActualizacionClase = {
        nombre,
        descripcion,
        idEntrenador,
        horario,
        cupoMaximo,
        cupoActual,
        salon,
        activa,
      };
      
      actualizarDatosClase(claseExistente.id, datosActualizacion)
        .then(() => {
          alert('Clase actualizada exitosamente');
          onGuardar(datosActualizacion);
        })
        .catch((error) => {
          console.error('Error al actualizar clase:', error);
          alert('Error al actualizar clase');
        });
    } else {
      // Crear nueva clase
      const datosCreacion: DatosCreacionClase = {
        nombre,
        descripcion,
        idEntrenador,
        horario,
        cupoMaximo,
        cupoActual,
        salon,
        activa,
      };
      
      crearNuevaClase(datosCreacion)
        .then(() => {
          alert('Clase creada exitosamente');
          onGuardar(datosCreacion);
        })
        .catch((error) => {
          console.error('Error al crear clase:', error);
          alert('Error al crear clase');
        });
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">
          {claseExistente ? 'Editar Clase' : 'Crear Nueva Clase'}
        </h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre:</label>
            <input 
              type="text" 
              className="form-control"
              id="nombre" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">Descripción:</label>
            <textarea 
              className="form-control"
              id="descripcion" 
              value={descripcion} 
              onChange={(e) => setDescripcion(e.target.value)} 
              rows={3}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="entrenador" className="form-label">Entrenador:</label>
            <select 
              className="form-control"
              id="entrenador" 
              value={idEntrenador} 
              onChange={(e) => setIdEntrenador(e.target.value)} 
              required
            >
              <option value="">Seleccione un entrenador</option>
              {entrenadores.map((ent) => (
                <option key={ent.id} value={ent.id}>
                  {ent.nombreCompleto} ({ent.especialidad})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="horario" className="form-label">Horario:</label>
            <input 
              type="text" 
              className="form-control"
              id="horario" 
              value={horario} 
              onChange={(e) => setHorario(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cupoMaximo" className="form-label">Cupo Máximo:</label>
            <input 
              type="number" 
              className="form-control"
              id="cupoMaximo" 
              value={cupoMaximo} 
              onChange={(e) => setCupoMaximo(Number(e.target.value))} 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cupoActual" className="form-label">Cupo Actual:</label>
            <input 
              type="number" 
              className="form-control"
              id="cupoActual" 
              value={cupoActual} 
              onChange={(e) => setCupoActual(Number(e.target.value))} 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="salon" className="form-label">Salón:</label>
            <input 
              type="text" 
              className="form-control"
              id="salon" 
              value={salon} 
              onChange={(e) => setSalon(e.target.value)} 
            />
          </div>
          <div className="mb-3 form-check">
            <input 
              type="checkbox" 
              className="form-check-input"
              id="activa" 
              checked={activa} 
              onChange={(e) => setActiva(e.target.checked)} 
            />
            <label className="form-check-label" htmlFor="activa">Activa:</label>
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary me-2">Guardar</button>
            <button type="button" className="btn btn-secondary" onClick={onCancelar}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};