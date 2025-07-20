import React, { useEffect, useState } from "react";
import axios from "axios";

type Receptionist = {
  id: string;
  email: string;
  contrasena: string;
  rol: "receptionist";
};

const Recepcionistas: React.FC = () => {
  const [recepcionistas, setRecepcionistas] = useState<Receptionist[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formId, setFormId] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formContrasena, setFormContrasena] = useState("");
  const [formError, setFormError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const fetchRecepcionistas = () => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        const users = response.data as any[];
        const data: Receptionist[] = users.filter(
          (user: any) => user.rol === "receptionist"
        );
        setRecepcionistas(data);
      })
      .catch((error) =>
        console.error("Error al obtener recepcionistas:", error)
      );
  };

  useEffect(() => {
    fetchRecepcionistas();
  }, []);

  const handleEliminar = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este recepcionista?")) {
      axios
        .delete(`http://localhost:3000/users/${id}`)
        .then(() => {
          fetchRecepcionistas();
        })
        .catch((error) =>
          console.error("Error al eliminar recepcionista:", error)
        );
    }
  };

  const handleAgregar = () => {
    setShowForm(true);
    setEditMode(false);
    setEditId(null);
    setFormId("");
    setFormEmail("");
    setFormContrasena("");
    setFormError("");
  };

  const handleEditar = (recep: Receptionist) => {
    setShowForm(true);
    setEditMode(true);
    setEditId(recep.id);
    setFormId(recep.id);
    setFormEmail(recep.email);
    setFormContrasena(recep.contrasena);
    setFormError("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formId || !formEmail || !formContrasena) {
      setFormError("Completa todos los campos.");
      return;
    }
    if (editMode && editId) {
      const updatedRecep: Receptionist = {
        id: formId,
        email: formEmail,
        contrasena: formContrasena,
        rol: "receptionist",
      };
      axios
        .put(`http://localhost:3000/users/${editId}`, updatedRecep)
        .then(() => {
          fetchRecepcionistas();
          setShowForm(false);
        })
        .catch((error) => {
          setFormError("Error al guardar cambios");
          console.error("Error al editar recepcionista:", error);
        });
    } else {
      const nuevoRecep: Receptionist = {
        id: formId,
        email: formEmail,
        contrasena: formContrasena,
        rol: "receptionist",
      };
      axios
        .post("http://localhost:3000/users", nuevoRecep)
        .then(() => {
          fetchRecepcionistas();
          setShowForm(false);
        })
        .catch((error) => {
          setFormError("Error al agregar recepcionista");
          console.error("Error al agregar recepcionista:", error);
        });
    }
  };

  return (
    <div className="card bg-dark text-white p-4 rounded-4 shadow-sm">
      <h3 className="text-warning mb-3">
        <i className="bi bi-people-fill me-2"></i>Lista de Recepcionistas
      </h3>

      <button
        className="btn btn-success mb-3"
        onClick={handleAgregar}
        disabled={showForm}
      >
        <i className="bi bi-person-plus-fill me-2"></i>Agregar Recepcionista
      </button>

      {showForm && (
        <form
          className="mb-4 p-3 rounded-3 bg-secondary"
          onSubmit={handleFormSubmit}
        >
          <div className="mb-2">
            <label className="form-label">ID</label>
            <input
              type="text"
              className="form-control"
              value={formId}
              onChange={(e) => setFormId(e.target.value)}
              required
              disabled={editMode}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Contraseña</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={formContrasena}
                onChange={(e) => setFormContrasena(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-light border-start"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                style={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderTopRightRadius: ".375rem",
                  borderBottomRightRadius: ".375rem",
                  background: "#444",
                  color: "#fff",
                  minWidth: "44px",
                }}
              >
                <i
                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                ></i>
              </button>
            </div>
          </div>
          {formError && (
            <div className="alert alert-danger py-1 mb-2">{formError}</div>
          )}
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              <i
                className={`bi ${
                  editMode ? "bi-save" : "bi-check-circle"
                } me-1`}
              ></i>
              {editMode ? "Guardar" : "Agregar"}
            </button>
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={() => setShowForm(false)}
            >
              <i className="bi bi-x-circle me-1"></i>Cancelar
            </button>
          </div>
        </form>
      )}

      <ul className="list-group">
        {recepcionistas.map((recep) => (
          <li
            key={recep.id}
            className="list-group-item d-flex justify-content-between align-items-center bg-secondary text-white"
          >
            <div>
              <strong>ID:</strong> {recep.id} <br />
              <strong>Email:</strong> {recep.email}
            </div>
            <div>
              <button
                className="btn btn-sm btn-primary me-2"
                onClick={() => handleEditar(recep)}
              >
                <i className="bi bi-pencil-fill"></i>
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleEliminar(recep.id)}
              >
                <i className="bi bi-trash-fill"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recepcionistas;
