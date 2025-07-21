import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const { currentUser, logout, loading, userRol } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const getDashboardLink = () => {
    if (userRol === "admin") return "/dashboard/admin";
    if (userRol === "receptionist") return "/dashboard/receptionist";
    if (userRol === "client") return "/dashboard/client";
    return "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          GymApp
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-list"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about-us">
                Sobre Nosotros
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contacto
              </Link>
            </li>
            {!currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Registrarse
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav">
            {loading ? (
              <li className="nav-item">
                <span className="nav-link text-white-50">Cargando...</span>
              </li>
            ) : currentUser ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to={getDashboardLink()}>
                    <i className="bi bi-person-circle me-1"></i>
                    Mi Dashboard ({userRol}) {}
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light ms-lg-2"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-primary" to="/login">
                  Iniciar Sesión{" "}
                  <i className="bi bi-box-arrow-in-right ms-1"></i>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
