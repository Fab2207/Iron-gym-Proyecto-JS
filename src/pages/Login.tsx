import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { type UsuarioAutenticado } from "../context/AuthContext";
import FormularioLogin from "../components/autenticacion/FormularioLogin";

const Login: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const manejarExito = (user: UsuarioAutenticado) => {
    setMessage("Inicio de sesión exitoso. Redirigiendo...");
    setError("");

    switch (user.rol) {
      case "admin":
        navigate("/dashboard/admin", { replace: true });
        break;
      case "receptionist":
        navigate("/dashboard/receptionist", { replace: true });
        break;
      case "client":
        navigate("/dashboard/client", { replace: true });
        break;
      case "trainer":
        navigate("/dashboard/trainer", { replace: true });
        break;
      default:
        navigate("/home", { replace: true });
        break;
    }
  };

  const manejarError = (mensajeError: string) => {
    setError(mensajeError);
    setMessage("");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light p-3">
      <div
        className="card shadow-lg p-4 rounded-4"
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <div className="card-body text-center">
          <h2 className="card-title text-primary mb-4 fw-bold">
            Iniciar Sesión
          </h2>
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
          <FormularioLogin onExito={manejarExito} onError={manejarError} />
          <div className="mt-4">
            <p className="text-muted">
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className="text-primary fw-semibold">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;