import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getClaseById, actualizarDatosClase } from '../../services/api';
import type{ Clase, DatosActualizacionClase } from '../../types';

const EditarClase: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [clase, setClase] = useState<Clase | null>(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [horario, setHorario] = useState('');
  const [cupoMaximo, setCupoMaximo] = useState(0);
  const [salon, setSalon] = useState('');
  const [activa, setActiva] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClase = async () => {
      if (id) {
        try {
          setLoading(true);
          const data = await getClaseById(id);
          setClase(data);
          setNombre(data.nombre);
          setDescripcion(data.descripcion || '');
          setHorario(data.horario);
          setCupoMaximo(data.cupoMaximo);
          setSalon(data.salon || '');
          setActiva(data.activa);
        } catch (err) {
          console.error("Error al cargar clase:", err);
          setError("No se pudo cargar la clase.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchClase();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const datosActualizados: DatosActualizacionClase = {
        nombre,
        descripcion,
        horario,
        cupoMaximo: Number(cupoMaximo),
        salon,
        activa,
      };
      await actualizarDatosClase(id, datosActualizados);
      alert('Clase actualizada exitosamente!');
      navigate('/dashboard/trainer/clases');
    } catch (err) {
      console.error('Error al actualizar clase:', err);
      setError('Error al actualizar clase. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Cargando clase...</div>;
  if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;
  if (!clase) return <div className="alert alert-warning text-center mt-5">Clase no encontrada.</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-info fw-bold mb-4">Editar Clase: {clase.nombre}</h2>
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
          {loading ? 'Actualizando...' : 'Actualizar Clase'}
        </button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate(-1)}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditarClase;