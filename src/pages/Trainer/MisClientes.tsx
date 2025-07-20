import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllClients } from '../../services/api';
import type{ Cliente } from '../../types';

const MisClientes: React.FC = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        setLoading(true);
        const data = await getAllClients();
        setClientes(data);
      } catch (err) {
        console.error("Error al cargar clientes:", err);
        setError("No se pudieron cargar los clientes.");
      } finally {
        setLoading(false);
      }
    };
    fetchClientes();
  }, []);

  if (loading) return <div className="text-center mt-5">Cargando clientes...</div>;
  if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-success fw-bold mb-4">Mis Clientes</h2>
      <p className="text-muted">Aquí verás los detalles y progreso de tus clientes asignados.</p>

      {clientes.length === 0 ? (
        <div className="alert alert-info text-center">No hay clientes asignados.</div>
      ) : (
        <ul className="list-group">
          {clientes.map((cliente) => (
            <li key={cliente.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{cliente.nombreCompleto}</strong> ({cliente.email}) - Membresía: {cliente.idMembresia}
              </div>
              <button
                className="btn btn-sm btn-outline-success"
                onClick={() => navigate(`/dashboard/trainer/clientes/${cliente.id}`)}
              >
                Ver Detalles
              </button>
            </li>
          ))}
        </ul>
      )}

      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
        Volver al Dashboard
      </button>
    </div>
  );
};

export default MisClientes;