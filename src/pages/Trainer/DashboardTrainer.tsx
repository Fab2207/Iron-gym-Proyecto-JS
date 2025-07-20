import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardTrainer: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-info shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-4">DASHBOARD ENTRENADOR</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#trainerNavbar"
            aria-controls="trainerNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="trainerNavbar">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <span className="nav-link text-white">
                  <i className="bi bi-person-circle me-1"></i>
                  Bienvenido, {currentUser?.nombre || "Entrenador"}
                </span>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-light ms-lg-2"
                  onClick={handleLogout}
                >
                  Cerrar Sesión <i className="bi bi-box-arrow-right"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container my-4 flex-grow-1">
        <h2 className="text-info fw-bold mb-4">BIENVENIDO, ENTRENADOR!</h2>
        <p className="text-muted">
          Aquí podrás gestionar tus rutinas, clases y ver el progreso de tus clientes.
        </p>

        <div className="row g-4">
          {/* Tarjeta de Gestión de Rutinas */}
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-sm rounded-4 h-100">
              <div className="card-body p-4 text-center">
                <i className="bi bi-person-workspace text-info fs-1 mb-3"></i>
                <h5 className="card-title fw-bold text-dark">
                  Gestión de Rutinas
                </h5>
                <p className="card-text text-muted">
                  Crea y asigna rutinas personalizadas a tus clientes.
                </p>
                <button
                  className="btn btn-outline-info mt-3 rounded-pill"
                  onClick={() => navigate("/dashboard/trainer/rutinas")} // Habilitado y redirige
                >
                  Ir a Rutinas
                </button>
              </div>
            </div>
          </div>

          {/* Tarjeta de Gestión de Clientes */}
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-sm rounded-4 h-100">
              <div className="card-body p-4 text-center">
                <i className="bi bi-people-fill text-success fs-1 mb-3"></i>
                <h5 className="card-title fw-bold text-dark">
                  Mis Clientes
                </h5>
                <p className="card-text text-muted">
                  Revisa el progreso y los detalles de tus clientes asignados.
                </p>
                <button
                  className="btn btn-outline-success mt-3 rounded-pill"
                  onClick={() => navigate("/dashboard/trainer/clientes")} // Habilitado y redirige
                >
                  Ver Clientes
                </button>
              </div>
            </div>
          </div>

          {/* Tarjeta de Gestión de Clases */}
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-sm rounded-4 h-100">
              <div className="card-body p-4 text-center">
                <i className="bi bi-easel-fill text-primary fs-1 mb-3"></i>
                <h5 className="card-title fw-bold text-dark">
                  Gestión de Clases
                </h5>
                <p className="card-text text-muted">
                  Administra las clases que impartes.
                </p>
                <button
                  className="btn btn-outline-primary mt-3 rounded-pill"
                  onClick={() => navigate("/dashboard/trainer/clases")} // Habilitado y redirige
                >
                  Ver Clases
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTrainer;