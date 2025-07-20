
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // Aseguramos que la importación sea correcta

import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importa Bootstrap Icons CSS
import { AuthProvider } from './context/AuthContext.tsx'; // Importa el proveedor de autenticación


// No hay inicialización de Firebase ni de ningún otro servicio de autenticación externo aquí.

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Envuelve toda la aplicación con el proveedor de autenticación local */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
