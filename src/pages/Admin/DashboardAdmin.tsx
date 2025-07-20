import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  ProveedorGestorVentanas,
  useGestorVentanas,
} from "../../components/ventanas/GestorVentanas";
import Estadisticas from "./Estadisticas";
import Resumen from "./Resumen";
import Recepcionistas from "./Recepcionistas";
import GestionClientes from "./GestionClientes";
import GestionMembresias from "./GestionMembresias";
import GestionEntrenadores from "./GestionEntrenadores";
import GestionClases from "./GestionClases";
import GestionSucursales from "./GestionSucursales";
import "./Estadisticas.css";

const ContenidoDashboardAdmin: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { abrirVentana } = useGestorVentanas();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    | "estadisticas"
    | "resumen"
    | "recepcionistas"
    | "clientes"
    | "membresias"
    | "entrenadores"
    | "clases"
    | "sucursales"
  >("estadisticas");

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const getDisplayEmail = (email: string | null | undefined) => {
    return email ? email.split("@")[0] : "Usuario";
  };

  const abrirVentanaEstadisticas = () => {
    abrirVentana({
      titulo: "Estadísticas del Gimnasio",
      contenido: <Estadisticas />,
      minimizable: true,
      maximizable: true,
    });
  };

  const abrirVentanaClientes = () => {
    abrirVentana({
      titulo: "Gestión de Clientes",
      contenido: <GestionClientes />,
      minimizable: true,
      maximizable: true,
    });
  };

  const abrirVentanaMembresias = () => {
    abrirVentana({
      titulo: "Gestión de Membresías",
      contenido: <GestionMembresias />,
      minimizable: true,
      maximizable: true,
    });
  };

  const abrirVentanaEntrenadores = () => {
    abrirVentana({
      titulo: "Gestión de Entrenadores",
      contenido: <GestionEntrenadores />,
      minimizable: true,
      maximizable: true,
    });
  };

  const abrirVentanaClases = () => {
    abrirVentana({
      titulo: "Gestión de Clases",
      contenido: <GestionClases />,
      minimizable: true,
      maximizable: true,
    });
  };

  const abrirVentanaSucursales = () => {
    abrirVentana({
      titulo: "Gestión de Sucursales",
      contenido: <GestionSucursales />,
      minimizable: true,
      maximizable: true,
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-dark shadow-sm px-3">
        <span className="navbar-brand fw-bold">Dashboard Administrador</span>
        <div className="d-flex align-items-center">
          <span className="text-white me-3 welcome-text-truncate">
            Bienvenido,{" "}
            <strong className="text-warning">
              {getDisplayEmail(currentUser?.email)}{" "}
              {/* Cambiado de usuarioActual */}
            </strong>
          </span>
          <button className="btn btn-outline-light" onClick={handleLogout}>
            Cerrar sesión <i className="bi bi-box-arrow-right"></i>
          </button>
        </div>
      </nav>

      <div className="container mt-5">
        <h2 className="mb-4 text-center text-primary fw-bold">
          Panel de Administrador
        </h2>

        <ul className="nav nav-tabs justify-content-center mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "estadisticas"
                  ? "active bg-primary text-white"
                  : ""
              }`}
              onClick={() => setActiveTab("estadisticas")}
            >
              <i className="bi bi-bar-chart-line-fill me-2"></i>Estadísticas
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "resumen" ? "active bg-primary text-white" : ""
              }`}
              onClick={() => setActiveTab("resumen")}
            >
              <i className="bi bi-graph-up-arrow me-2"></i>Resumen
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "recepcionistas"
                  ? "active bg-primary text-white"
                  : ""
              }`}
              onClick={() => setActiveTab("recepcionistas")}
            >
              <i className="bi bi-people-fill me-2"></i>Recepcionistas
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "clientes" ? "active bg-primary text-white" : ""
              }`}
              onClick={() => setActiveTab("clientes")}
            >
              <i className="bi bi-person-lines-fill me-2"></i>Clientes
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "membresias" ? "active bg-primary text-white" : ""
              }`}
              onClick={() => setActiveTab("membresias")}
            >
              <i className="bi bi-card-text me-2"></i>Membresías
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "entrenadores"
                  ? "active bg-primary text-white"
                  : ""
              }`}
              onClick={() => setActiveTab("entrenadores")}
            >
              <i className="bi bi-person-badge me-2"></i>Entrenadores
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "clases" ? "active bg-primary text-white" : ""
              }`}
              onClick={() => setActiveTab("clases")}
            >
              <i className="bi bi-calendar-event me-2"></i>Clases
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "sucursales" ? "active bg-primary text-white" : ""
              }`}
              onClick={() => setActiveTab("sucursales")}
            >
              <i className="bi bi-geo-alt me-2"></i>Sucursales
            </button>
          </li>
        </ul>

        <div className="text-center mb-4">
          <div className="btn-group" role="group">
            <button
              className="btn btn-outline-primary"
              onClick={abrirVentanaEstadisticas}
            >
              <i className="bi bi-window-plus me-1"></i>
              Abrir Estadísticas en Ventana
            </button>
            <button
              className="btn btn-outline-success"
              onClick={abrirVentanaClientes}
            >
              <i className="bi bi-window-plus me-1"></i>
              Abrir Clientes en Ventana
            </button>
            <button
              className="btn btn-outline-warning"
              onClick={abrirVentanaMembresias}
            >
              <i className="bi bi-window-plus me-1"></i>
              Abrir Membresías en Ventana
            </button>
            <button
              className="btn btn-outline-info"
              onClick={abrirVentanaEntrenadores}
            >
              <i className="bi bi-window-plus me-1"></i>
              Abrir Entrenadores en Ventana
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={abrirVentanaClases}
            >
              <i className="bi bi-window-plus me-1"></i>
              Abrir Clases en Ventana
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={abrirVentanaSucursales}
            >
              <i className="bi bi-window-plus me-1"></i>
              Abrir Sucursales en Ventana
            </button>
          </div>
        </div>

        <div className="tab-content">
          {activeTab === "estadisticas" && <Estadisticas />}
          {activeTab === "resumen" && <Resumen />}
          {activeTab === "recepcionistas" && <Recepcionistas />}
          {activeTab === "clientes" && <GestionClientes />}
          {activeTab === "membresias" && <GestionMembresias />}
          {activeTab === "entrenadores" && <GestionEntrenadores />}
          {activeTab === "clases" && <GestionClases />}
          {activeTab === "sucursales" && <GestionSucursales />}
        </div>
      </div>
    </div>
  );
};

const DashboardAdmin: React.FC = () => {
  return (
    <ProveedorGestorVentanas>
      <ContenidoDashboardAdmin />
    </ProveedorGestorVentanas>
  );
};

export default DashboardAdmin;
