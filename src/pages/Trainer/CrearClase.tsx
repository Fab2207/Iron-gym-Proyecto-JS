import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearNuevaClase } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import type{ DatosCreacionClase } from '../../types';

const CrearClase: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser: user } = useAuth();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [horario, setHorario] = useState('');
  const [cupoMaximo, setCupoMaximo] = useState(0);
  const [salon, setSalon] = useState('');
  const [activa, setActiva] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.id) {
      setError("No se pudo obtener el ID del entrenador. Inicia sesión de nuevo.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const nuevaClase: DatosCreacionClase = {
        nombre,
        descripcion,
        idEntrenador: user.id,
        horario,
        cupoMaximo: Number(cupoMaximo),
        cupoActual: 0, // Al crear, el cupo actual es 0
        salon,
        activa,
      };
      await crearNuevaClase(nuevaClase);
      alert('Clase creada exitosamente!');
      navigate('/dashboard/trainer/clases');
    } catch (err) {
      console.error('Error al crear clase:', err);
      setError('Error al crear clase. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-info fw-bold mb-4">Crear Nueva Clase</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre de la Clase</label>
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
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            className="form-control"
            id="descripcion"
            rows={3}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="horario" className="form-label">Horario</label>
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
          <label htmlFor="cupoMaximo" className="form-label">Cupo Máximo</label>
          <input
            type="number"
            className="form-control"
            id="cupoMaximo"
            value={cupoMaximo}
            onChange={(e) => setCupoMaximo(Number(e.target.value))}
            min="1"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="salon" className="form-label">Salón</label>
          <input
            type="text"
            className="form-control"
            id="salon"
            value={salon}
            onChange={(e) => setSalon(e.target.value)}
          />
        </div>
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="activa"
            checked={activa}
            onChange={(e) => setActiva(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="activa">
            Clase Activa
          </label>
        </div>
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Clase'}
        </button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate(-1)}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default CrearClase;