import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllClients } from '../../services/api';
import type{ Cliente } from '../../types';

const MisClientes: React.FC = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredClientes = clientes.filter(cliente =>
    cliente.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center mt-5">Cargando clientes...</div>;
  if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-success fw-bold mb-4">Mis Clientes</h2>
      <p className="text-muted">Aquí verás los detalles y progreso de tus clientes asignados.</p>

      <div className="mb-4">
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar cliente por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredClientes.length === 0 ? (
        <div className="alert alert-info text-center">No hay clientes asignados.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-success">
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Membresía</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td><strong>{cliente.nombreCompleto}</strong></td>
                  <td>{cliente.email}</td>
                  <td>{cliente.telefono || 'N/A'}</td>
                  <td>
                    <span className="badge bg-info">{cliente.idMembresia}</span>
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button
                        className="btn btn-outline-success"
                        onClick={() => navigate(`/dashboard/trainer/clientes/${cliente.id}`)}
                      >
                        Ver Detalles
                      </button>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => alert('Función de asignar rutina próximamente')}
                      >
                        Asignar Rutina
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
        Volver al Dashboard
      </button>
    </div>
  );
};

export default MisClientes;