import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRutinaById, actualizarRutina } from '../../services/api';
import type{ Rutina, DatosActualizacionRutina } from '../../types';

const EditarRutina: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [rutina, setRutina] = useState<Rutina | null>(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [nivel, setNivel] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRutina = async () => {
      if (id) {
        try {
          setLoading(true);
          const data = await getRutinaById(id);
          setRutina(data);
          setNombre(data.nombre);
          setDescripcion(data.descripcion);
          setNivel(data.nivel || '');
        } catch (err) {
          console.error("Error al cargar rutina:", err);
          setError("No se pudo cargar la rutina.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchRutina();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const datosActualizados: DatosActualizacionRutina = {
        nombre,
        descripcion,
        nivel,
      };
      await actualizarRutina(id, datosActualizados);
      alert('Rutina actualizada exitosamente!');
      navigate('/dashboard/trainer/rutinas');
    } catch (err) {
      console.error('Error al actualizar rutina:', err);
      setError('Error al actualizar rutina. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Cargando rutina...</div>;
  if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;
  if (!rutina) return <div className="alert alert-warning text-center mt-5">Rutina no encontrada.</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-primary fw-bold mb-4">Editar Rutina: {rutina.nombre}</h2>
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
          {loading ? 'Actualizando...' : 'Actualizar Rutina'}
        </button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate(-1)}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditarRutina;