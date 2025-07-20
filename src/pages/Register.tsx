import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FormularioRegistro from "../components/autenticacion/FormularioRegistro";

const Register: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const manejarExito = (mensaje: string) => {
    setError("");
    setMessage("");
    setMessage(mensaje);
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 2000);
  };

  const manejarError = (mensajeError: string) => {
    setError("");
    setMessage("");
    setError(mensajeError);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light p-3">
      <div
        className="card shadow-lg p-4 rounded-4"
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <div className="card-body text-center">
          <h2 className="card-title text-primary mb-4 fw-bold">
            Registrar Nueva Cuenta
          </h2>
          <p className="text-muted mb-4">
            Crea tu cuenta de gimnasio. Tu rol será automáticamente de
            "cliente".
          </p>
          {error && (
            <div className="alert alert-danger text-center rounded-3 mb-3">
              {error}
            </div>
          )}
          {message && (
            <div className="alert alert-success text-center rounded-3 mb-3">
              {message}
            </div>
          )}
          <FormularioRegistro onExito={manejarExito} onError={manejarError} />
          <div className="mt-4">
            <p className="text-muted">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="text-primary fw-semibold">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
