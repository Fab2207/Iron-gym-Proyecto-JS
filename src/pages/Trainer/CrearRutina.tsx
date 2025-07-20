import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearNuevaRutina } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import type{ DatosCreacionRutina } from '../../types';

const CrearRutina: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser: user } = useAuth();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [nivel, setNivel] = useState('');
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
      const nuevaRutina: DatosCreacionRutina = {
        nombre,
        descripcion,
        nivel,
        idEntrenador: user.id,
      };
      await crearNuevaRutina(nuevaRutina);
      alert('Rutina creada exitosamente!');
      navigate('/dashboard/trainer/rutinas');
    } catch (err) {
      console.error('Error al crear rutina:', err);
      setError('Error al crear rutina. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-primary fw-bold mb-4">Crear Nueva Rutina</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre de la Rutina</label>
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
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="nivel" className="form-label">Nivel</label>
          <input
            type="text"
            className="form-control"
            id="nivel"
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Rutina'}
        </button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate(-1)}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default CrearRutina;