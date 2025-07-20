import React, { useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  ProveedorGestorVentanas,
  useGestorVentanas,
} from "../../components/ventanas/GestorVentanas";

const ContenidoClientDashboard: React.FC = () => {
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

  const displayUserName = useMemo(() => {

    return currentUser?.nombre || "Cliente";
  }, [currentUser]);

  const abrirVentanaMembresia = () => {
    abrirVentana({
      titulo: "Estado de Membresía",
      contenido: (
        <div className="p-4">
          <h4 className="text-success mb-4">Mi Membresía</h4>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Membresía Premium</h5>
              <p className="card-text">
                Estado: <span className="badge bg-success">Activa</span>
              </p>
              <p className="card-text">Fecha de inicio: 01/01/2024</p>
              <p className="card-text">Fecha de vencimiento: 31/01/2024</p>
              <p className="card-text">Días restantes: 15 días</p>
            </div>
          </div>
        </div>
      ),
      minimizable: true,
      maximizable: true,
    });
  };

  const abrirVentanaPagos = () => {
    abrirVentana({
      titulo: "Historial de Pagos",
      contenido: (
        <div className="p-4">
          <h4 className="text-info mb-4">Mis Pagos</h4>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Concepto</th>
                  <th>Monto</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01/01/2024</td>
                  <td>Membresía Premium</td>
                  <td>S/ 80.00</td>
                  <td>
                    <span className="badge bg-success">Pagado</span>
                  </td>
                </tr>
                <tr>
                  <td>01/12/2023</td>
                  <td>Membresía Premium</td>
                  <td>S/ 80.00</td>
                  <td>
                    <span className="badge bg-success">Pagado</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
      minimizable: true,
      maximizable: true,
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-4">Dashboard Cliente</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#clientNavbar"
            aria-controls="clientNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="clientNavbar">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <span className="nav-link text-white">
                  <i className="bi bi-person-circle me-1"></i>
                  Bienvenido, {displayUserName}
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
        <h2 className="text-primary fw-bold mb-4">Bienvenido, Cliente!</h2>
        <p className="text-muted">
          Desde aquí podrás ver información relevante sobre tu membresía y
          actividades.
        </p>

        <div className="text-center mb-4">
          <div className="btn-group" role="group">
            <button
              className="btn btn-outline-success"
              onClick={abrirVentanaMembresia}
            >
              <i className="bi bi-window-plus me-1"></i>
              Abrir Membresía en Ventana
            </button>
            <button
              className="btn btn-outline-info"
              onClick={abrirVentanaPagos}
            >
              <i className="bi bi-window-plus me-1"></i>
              Abrir Pagos en Ventana
            </button>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-sm rounded-4 h-100">
              <div className="card-body p-4 text-center">
                <i className="bi bi-calendar-check text-success fs-1 mb-3"></i>
                <h5 className="card-title fw-bold text-dark">
                  Estado de Membresía
                </h5>
                <p className="card-text text-muted">
                  Aquí podrás ver la fecha de inicio, vencimiento y el estado
                  actual de tu membresía.
                </p>
                <button
                  className="btn btn-outline-primary mt-3 rounded-pill"
                  onClick={abrirVentanaMembresia}
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-sm rounded-4 h-100">
              <div className="card-body p-4 text-center">
                <i className="bi bi-credit-card text-info fs-1 mb-3"></i>
                <h5 className="card-title fw-bold text-dark">
                  Historial de Pagos
                </h5>
                <p className="card-text text-muted">
                  Consulta tus pagos realizados, fechas y montos.
                </p>
                <button
                  className="btn btn-outline-primary mt-3 rounded-pill"
                  onClick={abrirVentanaPagos}
                >
                  Ver Historial
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-sm rounded-4 h-100">
              <div className="card-body p-4 text-center">
                <i className="bi bi-graph-up text-warning fs-1 mb-3"></i>
                <h5 className="card-title fw-bold text-dark">Mi Progreso</h5>
                <p className="card-text text-muted">
                  Próximamente: Estadísticas y seguimiento de tus avances en el
                  gimnasio.
                </p>
                <button
                  className="btn btn-outline-secondary mt-3 rounded-pill"
                  disabled
                >
                  Próximamente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClientDashboard: React.FC = () => {
  return (
    <ProveedorGestorVentanas>
      <ContenidoClientDashboard />
    </ProveedorGestorVentanas>
  );
};

export default ClientDashboard;
