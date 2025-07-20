import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  ProveedorGestorVentanas,
  useGestorVentanas,
} from '../../components/ventanas/GestorVentanas';
import MisClientes from './MisClientes';
import GestionClasesTrainer from './GestionClasesTrainer';
import GestionRutinas from './GestionRutinas';

const ContenidoDashboardTrainer: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { abrirVentana } = useGestorVentanas();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const abrirVentanaClientes = () => {
    abrirVentana({
      titulo: "Mis Clientes",
      contenido: <MisClientes />,
      minimizable: true,
      maximizable: true,
    });
  };

  const abrirVentanaClases = () => {
    abrirVentana({
      titulo: "Gestión de Clases",
      contenido: <GestionClasesTrainer />,
      minimizable: true,
      maximizable: true,
    });
  };

  const abrirVentanaRutinas = () => {
    abrirVentana({
      titulo: "Gestión de Rutinas",
      contenido: <GestionRutinas />,
      minimizable: true,
      maximizable: true,
    });
  };

  const abrirVentanaProgreso = () => {
    abrirVentana({
      titulo: "Progreso de Clientes",
      contenido: (
        <div className="p-4">
          <h4 className="text-success mb-4">Progreso de Clientes</h4>
          <div className="alert alert-info">
            <h5>Seguimiento de Progreso</h5>
            <p>Aquí podrás ver el progreso de tus clientes:</p>
            <ul>
              <li>Asistencia a clases</li>
              <li>Cumplimiento de rutinas</li>
              <li>Evolución física</li>
              <li>Objetivos alcanzados</li>
            </ul>
            <div className="mt-3">
              <h6>Clientes Destacados del Mes:</h6>
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>Asistencia</th>
                      <th>Progreso</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Ana García</td>
                      <td>95%</td>
                      <td>Excelente</td>
                    </tr>
                    <tr>
                      <td>Pedro López</td>
                      <td>88%</td>
                      <td>Muy Bueno</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ),
      minimizable: true,
      maximizable: true,
    });
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

        <div className="text-center mb-4">
          <div className="btn-group" role="group">
            <button
              className="btn btn-outline-success"
              onClick={abrirVentanaClientes}
            >
              <i className="bi bi-window-plus me-1"></i>
              Abrir Clientes en Ventana
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={abrirVentanaClases}
            >
              <i className="bi bi-window-plus me-1"></i>
              Abrir Clases en Ventana
            </button>
            <button
              className="btn btn-outline-info"
              onClick={abrirVentanaRutinas}
            >
              <i className="bi bi-window-plus me-1"></i>
              Abrir Rutinas en Ventana
            </button>
            <button
              className="btn btn-outline-warning"
              onClick={abrirVentanaProgreso}
            >
              <i className="bi bi-window-plus me-1"></i>
              Abrir Progreso en Ventana
            </button>
          </div>
        </div>

        <div className="row g-4">
          {/* Tarjeta de Gestión de Rutinas */}
          <div className="col-md-6 col-lg-3">
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
                  onClick={() => navigate("/dashboard/trainer/rutinas")}
                >
                  Ir a Rutinas
                </button>
              </div>
            </div>
          </div>

          {/* Tarjeta de Gestión de Clientes */}
          <div className="col-md-6 col-lg-3">
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
                  onClick={() => navigate("/dashboard/trainer/clientes")}
                >
                  Ver Clientes
                </button>
              </div>
            </div>
          </div>

          {/* Tarjeta de Gestión de Clases */}
          <div className="col-md-6 col-lg-3">
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
                  onClick={() => navigate("/dashboard/trainer/clases")}
                >
                  Ver Clases
                </button>
              </div>
            </div>
          </div>

          {/* Tarjeta de Progreso */}
          <div className="col-md-6 col-lg-3">
            <div className="card shadow-sm rounded-4 h-100">
              <div className="card-body p-4 text-center">
                <i className="bi bi-graph-up text-warning fs-1 mb-3"></i>
                <h5 className="card-title fw-bold text-dark">
                  Progreso de Clientes
                </h5>
                <p className="card-text text-muted">
                  Monitorea el avance y logros de tus clientes.
                </p>
                <button
                  className="btn btn-outline-warning mt-3 rounded-pill"
                  onClick={abrirVentanaProgreso}
                >
                  Ver Progreso
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardTrainer: React.FC = () => {
  return (
    <ProveedorGestorVentanas>
      <ContenidoDashboardTrainer />
    </ProveedorGestorVentanas>
  );
};

export default DashboardTrainer;