import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import type { UsuarioAutenticado } from "../../context/AuthContext";

interface FormularioLoginProps {
  onExito: (user: UsuarioAutenticado) => void;
  onError: (mensajeError: string) => void;
}

const FormularioLogin: React.FC<FormularioLoginProps> = ({
  onExito,
  onError,
}) => {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onError("");
    setLoading(true);
    try {
      const user = await login(email, contrasena);
      onExito(user);
    } catch (err: any) {
      onError(err.message || "Error al iniciar sesión. Inténtalo de nuevo.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="contrasena" className="form-label">
          Contraseña
        </label>
        <input
          type="password"
          className="form-control"
          id="contrasena"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={loading}
      >
        {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
      </button>
    </form>
  );
};

export default FormularioLogin;
