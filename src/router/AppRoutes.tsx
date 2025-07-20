import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../components/common/PrivateRoute';
import { AuthProvider } from '../context/AuthContext';
import PublicLayout from '../components/layouts/PublicLayout'; 

// Páginas públicas
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import AboutUs from '../pages/AboutUs';
import Contact from '../pages/Contact';
import PaginaNoAutorizado from '../pages/PaginaNoAutorizado';

// Dashboards
import DashboardAdmin from '../pages/Admin/DashboardAdmin';
import DashboardReceptionist from '../pages/Recepcionista/DashboardReceptionist';
import DashboardClient from '../pages/Cliente/ClientDashboard';
import DashboardTrainer from '../pages/Trainer/DashboardTrainer';

// Páginas de gestión de Admin
import GestionClientes from '../pages/Admin/GestionClientes';
import GestionMembresias from '../pages/Admin/GestionMembresias';
import GestionEntrenadores from '../pages/Admin/GestionEntrenadores';
import GestionClases from '../pages/Admin/GestionClases';
import GestionSucursales from '../pages/Admin/GestionSucursales';
import Recepcionistas from '../pages/Admin/Recepcionistas';

// Páginas de Trainer
import MisClientes from '../pages/Trainer/MisClientes';
import ClienteDetalles from '../pages/Trainer/ClienteDetalles';
import GestionClasesTrainer from '../pages/Trainer/GestionClasesTrainer';
import CrearClase from '../pages/Trainer/CrearClase';
import EditarClase from '../pages/Trainer/EditarClase';
import GestionRutinas from '../pages/Trainer/GestionRutinas';
import CrearRutina from '../pages/Trainer/CrearRutina';
import EditarRutina from '../pages/Trainer/EditarRutina';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Rutas Públicas - Envueltas en PublicLayout */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} /> {/* Ruta Home como index */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="unauthorized" element={<PaginaNoAutorizado />} />
            {/* Si alguna de estas rutas públicas usa el Outlet de PublicLayout, debe estar aquí */}
          </Route>

          {/* Rutas Privadas */}
          {/* Rutas para Administrador */}
          <Route element={<PrivateRoute roles={['admin']} />}>
            <Route path="/dashboard/admin" element={<DashboardAdmin />} />
            <Route path="/dashboard/admin/clientes" element={<GestionClientes />} />
            <Route path="/dashboard/admin/membresias" element={<GestionMembresias />} />
            <Route path="/dashboard/admin/entrenadores" element={<GestionEntrenadores />} />
            <Route path="/dashboard/admin/clases" element={<GestionClases />} />
            <Route path="/dashboard/admin/sucursales" element={<GestionSucursales />} />
            <Route path="/dashboard/admin/recepcionistas" element={<Recepcionistas />} />
          </Route>

          {/* Rutas para Recepcionista */}
          <Route element={<PrivateRoute roles={['receptionist']} />}>
            <Route path="/dashboard/receptionist" element={<DashboardReceptionist />} />
          </Route>

          {/* Rutas para Cliente */}
          <Route element={<PrivateRoute roles={['client']} />}>
            <Route path="/dashboard/client" element={<DashboardClient />} />
          </Route>

          {/* Rutas para Entrenador */}
          <Route element={<PrivateRoute roles={['trainer']} />}>
            <Route path="/dashboard/trainer" element={<DashboardTrainer />} />
            <Route path="/dashboard/trainer/clientes" element={<MisClientes />} />
            <Route path="/dashboard/trainer/clientes/:id" element={<ClienteDetalles />} />
            <Route path="/dashboard/trainer/clases" element={<GestionClasesTrainer />} />
            <Route path="/dashboard/trainer/clases/crear" element={<CrearClase />} />
            <Route path="/dashboard/trainer/clases/editar/:id" element={<EditarClase />} />
            <Route path="/dashboard/trainer/rutinas" element={<GestionRutinas />} />
            <Route path="/dashboard/trainer/rutinas/crear" element={<CrearRutina />} />
            <Route path="/dashboard/trainer/rutinas/editar/:id" element={<EditarRutina />} />
          </Route>

          {/* Catch-all para rutas no definidas */}
          <Route path="*" element={<div>404 - Página No Encontrada</div>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;