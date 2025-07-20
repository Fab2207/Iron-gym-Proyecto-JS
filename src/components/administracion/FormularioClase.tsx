import React, { useState, useEffect } from 'react';
import type { DatosCreacionClase, DatosActualizacionClase } from '../../types';
import type{ Clase } from '../../types/Clase';
import type{ Entrenador } from '../../types/Entrenador';

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
    const datos: DatosCreacionClase | DatosActualizacionClase = {
      nombre,
      descripcion,
      idEntrenador,
      horario,
      cupoMaximo,
      cupoActual,
      salon,
      activa,
    };
    onGuardar(datos);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{claseExistente ? 'Editar Clase' : 'Crear Nueva Clase'}</h2>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="descripcion">Descripción:</label>
        <textarea id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
      </div>
      <div>
        <label htmlFor="entrenador">Entrenador:</label>
        <select id="entrenador" value={idEntrenador} onChange={(e) => setIdEntrenador(e.target.value)} required>
          <option value="">Seleccione un entrenador</option>
          {entrenadores.map((ent) => (
            <option key={ent.id} value={ent.id}>
              {ent.nombreCompleto} ({ent.especialidad})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="horario">Horario:</label>
        <input type="text" id="horario" value={horario} onChange={(e) => setHorario(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="cupoMaximo">Cupo Máximo:</label>
        <input type="number" id="cupoMaximo" value={cupoMaximo} onChange={(e) => setCupoMaximo(Number(e.target.value))} required />
      </div>
      <div>
        <label htmlFor="cupoActual">Cupo Actual:</label>
        <input type="number" id="cupoActual" value={cupoActual} onChange={(e) => setCupoActual(Number(e.target.value))} required />
      </div>
      <div>
        <label htmlFor="salon">Salón:</label>
        <input type="text" id="salon" value={salon} onChange={(e) => setSalon(e.target.value)} />
      </div>
      <div>
        <label htmlFor="activa">Activa:</label>
        <input type="checkbox" id="activa" checked={activa} onChange={(e) => setActiva(e.target.checked)} />
      </div>
      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancelar}>Cancelar</button>
    </form>
  );
};