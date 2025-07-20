import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerClasesPorEntrenador, eliminarClase } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import type{ Clase } from '../../types';

const GestionClases: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser: user } = useAuth();
  const [clases, setClases] = useState<Clase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchClases = async () => {
    if (user && user.id) {
      try {
        setLoading(true);
        const data = await obtenerClasesPorEntrenador(user.id);
        setClases(data);
      } catch (err) {
        console.error("Error al cargar clases del entrenador:", err);
        setError("No se pudieron cargar las clases.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("No se pudo obtener el ID del entrenador logueado.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClases();
  }, [user]);

  const filteredClases = clases.filter(clase =>
    clase.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clase.horario.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (clase.salon && clase.salon.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEliminarClase = async (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta clase?")) {
      try {
        await eliminarClase(id);
        setClases(clases.filter(clase => clase.id !== id));
        alert("Clase eliminada exitosamente.");
      } catch (err) {
        console.error("Error al eliminar clase:", err);
        setError("No se pudo eliminar la clase.");
      }
    }
  };

  if (loading) return <div className="text-center mt-5">Cargando clases...</div>;
  if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-info fw-bold mb-4">Gestión de Clases (Entrenador)</h2>
      <p className="text-muted">Aquí administrarás las clases que impartes.</p>

      <button className="btn btn-primary mb-3" onClick={() => navigate('/dashboard/trainer/clases/crear')}>
        Crear Nueva Clase
      </button>

      <div className="mb-4">
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar clase por nombre, horario o salón..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredClases.length === 0 ? (
        <div className="alert alert-info text-center">No hay clases asignadas a este entrenador.</div>
      ) : (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Horario</th>
              <th>Salón</th>
              <th>Cupo (Actual/Máximo)</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredClases.map((clase) => (
              <tr key={clase.id}>
                <td>{clase.nombre}</td>
                <td>{clase.horario}</td>
                <td>{clase.salon}</td>
                <td>{clase.cupoActual}/{clase.cupoMaximo}</td>
                <td>{clase.activa ? 'Activa' : 'Inactiva'}</td>
                <td>
                  <div className="btn-group btn-group-sm">
                    <button className="btn btn-info" onClick={() => navigate(`/dashboard/trainer/clases/editar/${clase.id}`)}>
                      Ver/Editar
                    </button>
                    <button 
                      className="btn btn-success" 
                      onClick={() => alert('Función de gestionar asistencia próximamente')}
                    >
                      Asistencia
                    </button>
                    <button className="btn btn-danger" onClick={() => handleEliminarClase(clase.id)}>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
        Volver al Dashboard
      </button>
    </div>
  );
};

export default GestionClases;