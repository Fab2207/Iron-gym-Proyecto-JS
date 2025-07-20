import React, { useState } from "react";
import { registrarUsuario } from "../../services/api";

interface FormularioRegistroProps {
  onExito: (mensaje: string) => void;
  onError: (mensajeError: string) => void;
}

const FormularioRegistro: React.FC<FormularioRegistroProps> = ({
  onExito,
  onError,
}) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onError("");

    if (contrasena !== confirmarContrasena) {
      onError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      await registrarUsuario({ nombre, email, contrasena, rol: "client" });
      onExito("¡Registro exitoso! Ahora puedes iniciar sesión.");
    } catch (err: any) {
      onError(err.message || "Error al registrar. Inténtalo de nuevo.");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">
          Nombre Completo
        </label>
        <input
          type="text"
          className="form-control"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
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
      <div className="mb-3">
        <label htmlFor="confirmarContrasena" className="form-label">
          Confirmar Contraseña
        </label>
        <input
          type="password"
          className="form-control"
          id="confirmarContrasena"
          value={confirmarContrasena}
          onChange={(e) => setConfirmarContrasena(e.target.value)}
          required
        />
      </div>
      {}
      {}
      <button
        type="submit"
        className="btn btn-success w-100"
        disabled={loading}
      >
        {loading ? "Registrando..." : "Registrar"}
      </button>
    </form>
  );
};

export default FormularioRegistro;
