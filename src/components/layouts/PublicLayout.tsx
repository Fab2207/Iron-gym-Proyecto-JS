import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const PublicLayout: React.FC = () => {
  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <Outlet />
      </div>

      <footer className="bg-dark text-white text-center py-3 mt-5">
        <div className="container">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} GymApp. Todos los derechos
            reservados.
          </p>
        </div>
      </footer>
    </>
  );
};

export default PublicLayout;