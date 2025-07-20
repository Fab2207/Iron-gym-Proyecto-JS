import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useGestorVentanas } from "../../components/ventanas/GestorVentanas";
import { getAllClients } from "../../services/api";
import type { Cliente } from "../../types";

type ClientDataType = Cliente;

const ContenidoDashboardReceptionist: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { abrirVentana } = useGestorVentanas();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"asistencia" | "clientes">(
    "asistencia"
  );
  const [clients, setClients] = useState<ClientDataType[]>([]);
  const [filteredClients, setFilteredClients] = useState<ClientDataType[]>([]);
  const [loadingClients, setLoadingClients] = useState<boolean>(true);
  const [errorClients, setErrorClients] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [modalSearchTerm, setModalSearchTerm] = useState<string>("");
  const [modalFilteredClients, setModalFilteredClients] = useState<
    ClientDataType[]
  >([]);

  useEffect(() => {
    const fetchClients = async () => {
      setLoadingClients(true);
      setErrorClients(null);
      try {
        const data = await getAllClients();
        setClients(data);
        setFilteredClients(data);
        setModalFilteredClients(data);
      } catch (error: any) {
        setErrorClients(error.message || "Error al cargar los clientes.");
      } finally {
        setLoadingClients(false);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredClients(clients);
    } else {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const results = clients.filter(
        (client) =>
          client.nombreCompleto.toLowerCase().includes(lowercasedSearchTerm) ||
          client.id.toLowerCase().includes(lowercasedSearchTerm)
      );
      setFilteredClients(results);
    }
  }, [searchTerm, clients]);

  useEffect(() => {
    if (modalSearchTerm === "") {
      setModalFilteredClients(clients);
    } else {
      const lowercasedModalSearchTerm = modalSearchTerm.toLowerCase();
      const results = clients.filter(
        (client) =>
          client.nombreCompleto
            .toLowerCase()
            .includes(lowercasedModalSearchTerm) ||
          client.id.toLowerCase().includes(lowercasedModalSearchTerm)
      );
      setModalFilteredClients(results);
    }
  }, [modalSearchTerm, clients]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const getDisplayEmail = (email: string | null | undefined) => {
    return email ? email.split("@")[0] : "Recepcionista";
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleModalSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
  };

  const handleModalSearchSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
  };

  const handleMarcarAsistenciaModal = (clienteIdONombre: string) => {
    console.log("Marcar asistencia para:", clienteIdONombre);
  };

  const abrirVentanaAsistencia = () => {
    setModalSearchTerm("");
    abrirVentana({
      titulo: "Control de Asistencia",
      contenido: (
        <div className="p-4">
          <h4 className="text-info mb-4">Marcar Asistencia</h4>
          <form onSubmit={handleModalSearchSubmit}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar cliente por nombre o ID..."
                value={modalSearchTerm}
                onChange={handleModalSearchChange}
              />
              <button className="btn btn-primary" type="submit">
                <i className="bi bi-search me-1"></i>Buscar
              </button>
            </div>
          </form>
          {modalSearchTerm && (
            <div className="mt-4">
              <h5 className="text-info mb-3">Resultados de la Búsqueda</h5>
              {loadingClients ? (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                </div>
              ) : errorClients ? (
                <div className="alert alert-danger text-center">
                  {errorClients}
                </div>
              ) : modalFilteredClients.length === 0 ? (
                <div className="alert alert-warning text-center">
                  No se encontraron clientes que coincidan con la búsqueda.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover table-striped">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th>Nombre Completo</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modalFilteredClients.map((client) => (
                        <tr key={client.id}>
                          <td>{client.nombreCompleto}</td>
                          <td>{client.email}</td>
                          <td>{client.telefono || "N/A"}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-success rounded-pill"
                              onClick={() => handleMarcarAsistenciaModal(client.nombreCompleto)}
                            >
                              Seleccionar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          <button
            className="btn btn-success mt-3"
            onClick={() => handleMarcarAsistenciaModal(modalSearchTerm)}
          >
            <i className="bi bi-check-circle-fill me-1"></i>
            Marcar Asistencia
          </button>
        </div>
      ),
      minimizable: true,
      maximizable: true,
    });
  };

  const abrirVentanaClientes = () => {
    abrirVentana({
      titulo: "Lista de Clientes",
      contenido: (
        <div className="p-4">
          <h4 className="text-info mb-4">Clientes Registrados</h4>
          {loadingClients ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "150px" }}
            >
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">
                  Cargando clientes...
                </span>
              </div>
            </div>
          ) : errorClients ? (
            <div className="alert alert-danger text-center rounded-3 mb-3">
              {errorClients}
            </div>
          ) : clients.length === 0 ? (
            <div className="alert alert-warning text-center rounded-3 mb-3">
              No hay clientes registrados.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped rounded-3 overflow-hidden shadow-sm">
                <thead className="bg-primary text-white">
                  <tr>
                    <th scope="col">Nombre Completo</th>
                    <th scope="col">Email</th>
                    <th scope="col">Teléfono</th>
                    <th scope="col">Membresía</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.id}>
                      <td>{client.nombreCompleto}</td>
                      <td>{client.email}</td>
                      <td>{client.telefono || "N/A"}</td>
                      <td>{client.idMembresia}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-info rounded-pill">
                          Ver Historial
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
          <span className="navbar-brand fw-bold fs-4">
            Dashboard Recepcionista
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#receptionistNavbar"
            aria-controls="receptionistNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="receptionistNavbar">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <span className="nav-link text-white welcome-text-truncate-receptionist">
                  <i className="bi bi-person-circle me-1"></i>
                  Bienvenido,{" "}
                  <strong className="text-dark">
                    {getDisplayEmail(currentUser?.email)}
                  </strong>
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
        <h2 className="text-info fw-bold mb-4">
          Gestión de Operaciones Diarias
        </h2>

        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "asistencia" ? "active bg-info text-white" : ""
              }`}
              onClick={() => setActiveTab("asistencia")}
            >
              <i className="bi bi-person-check-fill me-2"></i>Marcar Asistencia
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "clientes" ? "active bg-info text-white" : ""
              }`}
              onClick={() => setActiveTab("clientes")}
            >
              <i className="bi bi-people-fill me-2"></i>Ver Clientes e Historial
            </button>
          </li>
        </ul>

        <div className="text-center mb-4">
          <div className="btn-group" role="group">
            <button
              className="btn btn-outline-info"
              onClick={abrirVentanaAsistencia}
            >
              <i className="bi bi-window-plus me-1"></i>
              Abrir Asistencia en Ventana
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={abrirVentanaClientes}
            >
              <i className="bi bi-window-plus me-1"></i>
              Abrir Clientes en Ventana
            </button>
          </div>
        </div>

        <div className="tab-content">
          <div
            className={`tab-pane fade ${
              activeTab === "asistencia" ? "show active" : ""
            }`}
          >
            <div className="card shadow-sm rounded-4 p-4">
              <h3 className="card-title text-info mb-4 fw-bold">
                Marcar Asistencia
              </h3>
              <p className="text-muted">
                Aquí el recepcionista podrá buscar clientes y registrar su
                asistencia. Se puede implementar un campo de búsqueda por nombre
                o ID de miembro.
              </p>
              <form onSubmit={handleSearchSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control rounded-start-pill p-2"
                    placeholder="Buscar cliente por nombre o ID..."
                    aria-label="Buscar cliente"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <button
                    className="btn btn-primary rounded-end-pill"
                    type="submit"
                  >
                    <i className="bi bi-search me-1"></i>Buscar
                  </button>
                </div>
              </form>
              <button className="btn btn-success rounded-pill mt-3">
                <i className="bi bi-check-circle-fill me-1"></i>Marcar
                Asistencia (simulado)
              </button>

              {searchTerm && (
                <div className="mt-4">
                  <h4 className="text-info mb-3">Resultados de la Búsqueda</h4>
                  {loadingClients ? (
                    <div className="d-flex justify-content-center">
                      <div className="spinner-border text-info" role="status">
                        <span className="visually-hidden">Cargando...</span>
                      </div>
                    </div>
                  ) : errorClients ? (
                    <div className="alert alert-danger text-center">
                      {errorClients}
                    </div>
                  ) : filteredClients.length === 0 ? (
                    <div className="alert alert-warning text-center">
                      No se encontraron clientes que coincidan con la búsqueda.
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover table-striped">
                        <thead className="bg-primary text-white">
                          <tr>
                            <th>Nombre Completo</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Membresía</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredClients.map((client) => (
                            <tr key={client.id}>
                              <td>{client.nombreCompleto}</td>
                              <td>{client.email}</td>
                              <td>{client.telefono || "N/A"}</td>
                              <td>{client.idMembresia}</td>
                              <td>
                                <button className="btn btn-sm btn-outline-info rounded-pill">
                                  Ver Detalles
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div
            className={`tab-pane fade ${
              activeTab === "clientes" ? "show active" : ""
            }`}
          >
            <div className="card shadow-sm rounded-4 p-4">
              <h3 className="card-title text-info mb-4 fw-bold">
                Listado de Clientes
              </h3>
              {loadingClients ? (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "150px" }}
                >
                  <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden">
                      Cargando clientes...
                    </span>
                  </div>
                </div>
              ) : errorClients ? (
                <div className="alert alert-danger text-center rounded-3 mb-3">
                  {errorClients}
                </div>
              ) : clients.length === 0 ? (
                <div className="alert alert-warning text-center rounded-3 mb-3">
                  No hay clientes registrados.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover table-striped rounded-3 overflow-hidden shadow-sm">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th scope="col">Nombre Completo</th>
                        <th scope="col">Email</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">Membresía</th>
                        <th scope="col">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map((client) => (
                        <tr key={client.id}>
                          <td>{client.nombreCompleto}</td>
                          <td>{client.email}</td>
                          <td>{client.telefono || "N/A"}</td>
                          <td>{client.idMembresia}</td>
                          <td>
                            <button className="btn btn-sm btn-outline-info rounded-pill">
                              Ver Historial
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContenidoDashboardReceptionist;