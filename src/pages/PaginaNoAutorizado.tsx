import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaginaNoAutorizado: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h1 className="display-4 text-danger">Acceso Denegado</h1>
      <p className="lead">No tienes los permisos necesarios para ver esta página.</p>
      <p>Por favor, contacta al administrador si crees que esto es un error.</p>
      <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
        Volver al Inicio
      </button>
    </div>
  );
};

export default PaginaNoAutorizado;