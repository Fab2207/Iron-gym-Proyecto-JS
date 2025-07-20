import React, { useState, useEffect } from 'react';
import type { DatosCreacionMembresia, DatosActualizacionMembresia } from '../../types';
import type { Membresia } from '../../types/Membresia';
import { crearNuevaMembresia, actualizarDatosMembresia } from '../../services/api';

interface FormularioMembresiaProps {
  membresiaExistente?: Membresia;
  onGuardar: (datos: DatosCreacionMembresia | DatosActualizacionMembresia) => void;
  onCancelar: () => void;
}

const FormularioMembresia: React.FC<FormularioMembresiaProps> = ({ membresiaExistente, onGuardar, onCancelar }) => {
  const [nombre, setNombre] = useState(membresiaExistente?.nombre || '');
  const [descripcion, setDescripcion] = useState(membresiaExistente?.descripcion || '');
  const [precio, setPrecio] = useState(membresiaExistente?.precio || 0);
  const [duracionEnDias, setDuracionEnDias] = useState(membresiaExistente?.duracionEnDias || 0);
  const [activa, setActiva] = useState(membresiaExistente?.activa || false);

  useEffect(() => {
    if (membresiaExistente) {
      setNombre(membresiaExistente.nombre);
      setDescripcion(membresiaExistente.descripcion);
      setPrecio(membresiaExistente.precio);
      setDuracionEnDias(membresiaExistente.duracionEnDias);
      setActiva(membresiaExistente.activa);
    } else {
      setNombre('');
      setDescripcion('');
      setPrecio(0);
      setDuracionEnDias(0);
      setActiva(false);
    }
  }, [membresiaExistente]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (membresiaExistente) {
      // Actualizar membresía existente
      const datosActualizacion: DatosActualizacionMembresia = {
        nombre,
        descripcion,
        precio,
        duracionEnDias,
        activa,
      };
      
      actualizarDatosMembresia(membresiaExistente.id, datosActualizacion)
        .then(() => {
          alert('Membresía actualizada exitosamente');
          onGuardar(datosActualizacion);
        })
        .catch((error) => {
          console.error('Error al actualizar membresía:', error);
          alert('Error al actualizar membresía');
        });
    } else {
      // Crear nueva membresía
      const datosCreacion: DatosCreacionMembresia = {
        nombre,
        descripcion,
        precio,
        duracionEnDias,
        activa,
      };
      
      crearNuevaMembresia(datosCreacion)
        .then(() => {
          alert('Membresía creada exitosamente');
          onGuardar(datosCreacion);
        })
        .catch((error) => {
          console.error('Error al crear membresía:', error);
          alert('Error al crear membresía');
        });
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">
          {membresiaExistente ? 'Editar Membresía' : 'Crear Nueva Membresía'}
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
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="precio" className="form-label">Precio:</label>
            <input
              type="number"
              className="form-control"
              id="precio"
              value={precio}
              onChange={(e) => setPrecio(Number(e.target.value))}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="duracionEnDias" className="form-label">Duración (Días):</label>
            <input
              type="number"
              className="form-control"
              id="duracionEnDias"
              value={duracionEnDias}
              onChange={(e) => setDuracionEnDias(Number(e.target.value))}
              required
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

export default FormularioMembresia;