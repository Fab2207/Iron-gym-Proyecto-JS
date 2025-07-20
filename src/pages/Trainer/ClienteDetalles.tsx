import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getClienteById } from '../../services/api';
import type{ Cliente } from '../../types';

const ClienteDetalles: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCliente = async () => {
      if (id) {
        try {
          setLoading(true);
          const data = await getClienteById(id);
          setCliente(data);
        } catch (err) {
          console.error("Error al cargar cliente:", err);
          setError("No se pudo cargar los detalles del cliente.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCliente();
  }, [id]);

  if (loading) return <div className="text-center mt-5">Cargando detalles del cliente...</div>;
  if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;
  if (!cliente) return <div className="alert alert-warning text-center mt-5">Cliente no encontrado.</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-success fw-bold mb-4">Detalles del Cliente: {cliente.nombreCompleto}</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Información General</h5>
          <p className="card-text"><strong>Email:</strong> {cliente.email}</p>
          <p className="card-text"><strong>Teléfono:</strong> {cliente.telefono || 'N/A'}</p>
          <p className="card-text"><strong>ID Membresía:</strong> {cliente.idMembresia}</p>
          <p className="card-text"><strong>Fecha de Nacimiento:</strong> {cliente.fechaNacimiento || 'N/A'}</p>
          <p className="card-text"><strong>Fecha de Registro:</strong> {cliente.fechaRegistro || 'N/A'}</p>
        </div>
      </div>
      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
        Volver a Mis Clientes
      </button>
    </div>
  );
};

export default ClienteDetalles;