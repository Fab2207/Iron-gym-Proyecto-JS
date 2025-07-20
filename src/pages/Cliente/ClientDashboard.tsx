import React, { useMemo, useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  ProveedorGestorVentanas,
  useGestorVentanas,
} from "../../components/ventanas/GestorVentanas";
import { getAllClases, getAllMembresias } from "../../services/api";
import type { Clase, Membresia } from "../../types";

const ContenidoClientDashboard: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { abrirVentana } = useGestorVentanas();
  const navigate = useNavigate();
  const [clases, setClases] = useState<Clase[]>([]);
  const [membresias, setMembresias] = useState<Membresia[]>([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [clasesData, membresiasData] = await Promise.all([
          getAllClases(),
          getAllMembresias(),
        ]);
        setClases(clasesData);
        setMembresias(membresiasData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    cargarDatos();
  }, []);

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
    const membresiaActual = membresias.find(m => m.id === "premium") || membresias[0];
    
    abrirVentana({
      titulo: "Estado de Membresía",
      contenido: (
        <div className="p-4">
          <h4 className="text-success mb-4">Mi Membresía</h4>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{membresiaActual?.nombre || "Membresía Premium"}</h5>
              <p className="card-text">
                Estado: <span className="badge bg-success">Activa</span>
              </p>
              <p className="card-text">Fecha de inicio: 01/01/2024</p>
              <p className="card-text">Fecha de vencimiento: 31/12/2024</p>
              <p className="card-text">Días restantes: 45 días</p>
              <p className="card-text">
                <strong>Precio:</strong> ${membresiaActual?.precio || 50}.00
              </p>
              <p className="card-text">
                <strong>Descripción:</strong> {membresiaActual?.descripcion || "Acceso total y entrenador personal"}
              </p>
              <div className="mt-3">
                <button className="btn btn-primary me-2">Renovar Membresía</button>
                <button className="btn btn-outline-secondary">Cambiar Plan</button>
              </div>
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
          <div className="mb-3">
            <button className="btn btn-success me-2">Realizar Pago</button>
            <button className="btn btn-outline-info">Descargar Recibo</button>
          </div>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Concepto</th>
                  <th>Monto</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01/01/2024</td>
                  <td>Membresía Premium</td>
                  <td>$50.00</td>
                  <td>
                    <span className="badge bg-success">Pagado</span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary">Ver Recibo</button>
                  </td>
                </tr>
                <tr>
                  <td>01/12/2023</td>
                  <td>Membresía Premium</td>
                  <td>$50.00</td>
                  <td>
                    <span className="badge bg-success">Pagado</span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary">Ver Recibo</button>
                  </td>
                </tr>
                <tr>
                  <td>01/11/2023</td>
                  <td>Membresía Premium</td>
                  <td>$50.00</td>
                  <td>
                    <span className="badge bg-success">Pagado</span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary">Ver Recibo</button>
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

  const abrirVentanaClases = () => {
    abrirVentana({
      titulo: "Clases Disponibles",
      contenido: (
        <div className="p-4">
          <h4 className="text-primary mb-4">Clases Disponibles</h4>
          <div className="mb-3">
            <button className="btn btn-success me-2">Reservar Clase</button>
            <button className="btn btn-outline-info">Mis Reservas</button>
          </div>
          <div className="row">
            {clases.map((clase) => (
              <div key={clase.id} className="col-md-6 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{clase.nombre}</h5>
                    <p className="card-text">{clase.descripcion}</p>
                    <p className="card-text">
                      <strong>Horario:</strong> {clase.horario}
                    </p>
                    <p className="card-text">
                      <strong>Salón:</strong> {clase.salon}
                    </p>
                    <p className="card-text">
                      <strong>Cupos:</strong> {clase.cupoActual}/{clase.cupoMaximo}
                    </p>
                    <button 
                      className="btn btn-primary btn-sm"
                      disabled={clase.cupoActual >= clase.cupoMaximo}
                    >
                      {clase.cupoActual >= clase.cupoMaximo ? "Lleno" : "Reservar"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      minimizable: true,
      maximizable: true,
    });
  };

  const abrirVentanaProgreso = () => {
    abrirVentana({
      titulo: "Mi Progreso",
      contenido: (
        <div className="p-4">
          <h4 className="text-warning mb-4">Mi Progreso</h4>
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">Estadísticas del Mes</h5>
                  <ul className="list-unstyled">
                    <li><strong>Días asistidos:</strong> 18/30</li>
                    <li><strong>Clases tomadas:</strong> 12</li>
                    <li><strong>Calorías quemadas:</strong> 2,400</li>
                    <li><strong>Tiempo total:</strong> 24 horas</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">Objetivos</h5>
                  <div className="mb-2">
                    <label>Peso objetivo: 70kg</label>
                    <div className="progress">
                      <div className="progress-bar" style={{width: "75%"}}>75%</div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <label>Asistencia mensual: 25 días</label>
                    <div className="progress">
                      <div className="progress-bar bg-success" style={{width: "72%"}}>18/25</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <button className="btn btn-primary me-2">Actualizar Objetivos</button>
            <button className="btn btn-outline-secondary">Ver Historial Completo</button>
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
            <button
              className="btn btn-outline-primary"
              onClick={abrirVentanaClases}
            >
              <i className="bi bi-window-plus me-1"></i>
              Abrir Clases en Ventana
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
          <div className="col-md-6 col-lg-3">
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
          <div className="col-md-6 col-lg-3">
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
          <div className="col-md-6 col-lg-3">
            <div className="card shadow-sm rounded-4 h-100">
              <div className="card-body p-4 text-center">
                <i className="bi bi-calendar-event text-primary fs-1 mb-3"></i>
                <h5 className="card-title fw-bold text-dark">Clases Disponibles</h5>
                <p className="card-text text-muted">
                  Reserva clases, ve horarios y gestiona tus actividades.
                </p>
                <button
                  className="btn btn-outline-primary mt-3 rounded-pill"
                  onClick={abrirVentanaClases}
                >
                  Ver Clases
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card shadow-sm rounded-4 h-100">
              <div className="card-body p-4 text-center">
                <i className="bi bi-graph-up text-warning fs-1 mb-3"></i>
                <h5 className="card-title fw-bold text-dark">Mi Progreso</h5>
                <p className="card-text text-muted">
                  Estadísticas y seguimiento de tus avances en el gimnasio.
                </p>
                <button
                  className="btn btn-outline-primary mt-3 rounded-pill"
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

const ClientDashboard: React.FC = () => {
  return (
    <ProveedorGestorVentanas>
      <ContenidoClientDashboard />
    </ProveedorGestorVentanas>
  );
};

export default ClientDashboard;