import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { iniciarSesionUsuario } from "../services/api";
import type { Usuario, RolUsuario } from "../types";

export interface UsuarioAutenticado {
  id: string;
  email: string;
  rol: RolUsuario;
  nombre: string;
}

interface AuthContextType {
  currentUser: UsuarioAutenticado | null;
  userRol: RolUsuario | null;
  loading: boolean;
  login: (email: string, contrasena: string) => Promise<UsuarioAutenticado>;
  logout: () => Promise<void>;
  appId: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  
  const idUsuario = context.currentUser?.id || "";
  
  return { ...context, idUsuario };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UsuarioAutenticado | null>(
    null
  );
  const [userRol, setUserRol] = useState<RolUsuario | null>(null);
  const [loading, setLoading] = useState(true);

  const appId: string = "gym-app-local";

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("currentUser");
    if (usuarioGuardado) {
      try {
        const parsedUser: UsuarioAutenticado = JSON.parse(usuarioGuardado);
        setCurrentUser(parsedUser);
        setUserRol(parsedUser.rol);
      } catch (e) {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("userRol");
      }
    }
    setLoading(false);
  }, []);

  const login = async (
    email: string,
    contrasena: string
  ): Promise<UsuarioAutenticado> => {
    setLoading(true);
    try {
      const user: Usuario = await iniciarSesionUsuario(email, contrasena);

      if (!user || !user.id || !user.email || !user.rol || !user.nombre) {
        throw new Error(
          "Respuesta de inicio de sesión inválida: faltan datos esenciales del usuario (id, email, rol, nombre)."
        );
      }

      const authUser: UsuarioAutenticado = {
        id: user.id,
        email: user.email,
        rol: user.rol as RolUsuario,
        nombre: user.nombre,
      };
      setCurrentUser(authUser);
      setUserRol(authUser.rol);

      localStorage.setItem("currentUser", JSON.stringify(authUser));
      localStorage.setItem("userRol", authUser.rol);

      return authUser;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Ocurrió un error desconocido durante el inicio de sesión."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setCurrentUser(null);
      setUserRol(null);
      localStorage.removeItem("currentUser");
      localStorage.removeItem("userRol");
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Ocurrió un error desconocido durante el cierre de sesión."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    userRol,
    loading,
    login,
    logout,
    appId,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;