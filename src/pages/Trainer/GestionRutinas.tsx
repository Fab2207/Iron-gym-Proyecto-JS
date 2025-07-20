import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerRutinas, eliminarRutina } from '../../services/api';
import type{ Rutina } from '../../types';

const GestionRutinas: React.FC = () => {
  const navigate = useNavigate();
  const [rutinas, setRutinas] = useState<Rutina[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRutinas = async () => {
    try {
      setLoading(true);
      const data = await obtenerRutinas();
      setRutinas(data);
    } catch (err) {
      console.error("Error al cargar rutinas:", err);
      setError("No se pudieron cargar las rutinas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRutinas();
  }, []);

  const filteredRutinas = rutinas.filter(rutina =>
    rutina.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rutina.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (rutina.nivel && rutina.nivel.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEliminarRutina = async (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta rutina?")) {
      try {
        await eliminarRutina(id);
        setRutinas(rutinas.filter(rutina => rutina.id !== id));
        alert("Rutina eliminada exitosamente.");
      } catch (err) {
        console.error("Error al eliminar rutina:", err);
        setError("No se pudo eliminar la rutina.");
      }
    }
  };

  if (loading) return <div className="text-center mt-5">Cargando rutinas...</div>;
  if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-info fw-bold mb-4">Gestión de Rutinas</h2>
      <p className="text-muted">Aquí gestionarás las rutinas de tus clientes.</p>

      <button className="btn btn-primary mb-3" onClick={() => navigate('/dashboard/trainer/rutinas/crear')}>
        Crear Nueva Rutina
      </button>

      <div className="mb-4">
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar rutina por nombre, descripción o nivel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredRutinas.length === 0 ? (
        <div className="alert alert-info text-center">No hay rutinas disponibles.</div>
      ) : (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Nivel</th>
              <th>Cliente Asignado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredRutinas.map((rutina) => (
              <tr key={rutina.id}>
                <td>{rutina.nombre}</td>
                <td>{rutina.descripcion}</td>
                <td>{rutina.nivel || "N/A"}</td>
                <td>{rutina.idCliente || "Sin asignar"}</td>
                <td>
                  <button className="btn btn-sm btn-info me-2" onClick={() => navigate(`/dashboard/trainer/rutinas/editar/${rutina.id}`)}>
                    Ver/Editar
                  </button>
                  <button 
                    className="btn btn-sm btn-success me-2" 
                    onClick={() => alert('Función de asignar a cliente próximamente')}
                  >
                    Asignar
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleEliminarRutina(rutina.id)}>
                    Eliminar
                  </button>
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

export default GestionRutinas;