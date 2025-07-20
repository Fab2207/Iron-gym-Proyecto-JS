import React, { useState, createContext, useContext } from "react";
import { ControladorVentana } from "./ControladorVentana";

interface Ventana {
  id: string;
  titulo: string;
  contenido: React.ReactNode;
  minimizable?: boolean;
  maximizable?: boolean;
  redimensionable?: boolean;
}

interface GestorVentanasContexto {
  abrirVentana: (ventana: Omit<Ventana, "id">) => string;
  cerrarVentana: (id: string) => void;
  cerrarTodasLasVentanas: () => void;
  ventanas: Ventana[];
}

const ContextoGestorVentanas = createContext<GestorVentanasContexto | undefined>(
  undefined
);

export const useGestorVentanas = () => {
  const contexto = useContext(ContextoGestorVentanas);
  if (!contexto) {
    throw new Error(
      "useGestorVentanas debe ser usado dentro de un ProveedorGestorVentanas"
    );
  }
  return contexto;
};

interface ProveedorGestorVentanasProps {
  children: React.ReactNode;
}

export const ProveedorGestorVentanas: React.FC<
  ProveedorGestorVentanasProps
> = ({ children }) => {
  const [ventanas, setVentanas] = useState<Ventana[]>([]);

  const abrirVentana = (ventana: Omit<Ventana, "id">): string => {
    const id = `ventana-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    const nuevaVentana: Ventana = { ...ventana, id };
    setVentanas((prev) => [...prev, nuevaVentana]);
    return id;
  };

  const cerrarVentana = (id: string) => {
    setVentanas((prev) => prev.filter((ventana) => ventana.id !== id));
  };

  const cerrarTodasLasVentanas = () => {
    setVentanas([]);
  };

  const valor = {
    abrirVentana,
    cerrarVentana,
    cerrarTodasLasVentanas,
    ventanas,
  };

  return (
    <ContextoGestorVentanas.Provider value={valor}>
      {children}
      {ventanas.map((ventana, index) => (
        <ControladorVentana
          key={ventana.id}
          titulo={ventana.titulo}
          onCerrar={() => cerrarVentana(ventana.id)}
          minimizable={ventana.minimizable}
          maximizable={ventana.maximizable}
          redimensionable={ventana.redimensionable}
          posicionInicial={{ x: 100 + index * 30, y: 100 + index * 30 }}
        >
          {ventana.contenido}
        </ControladorVentana>
      ))}
    </ContextoGestorVentanas.Provider>
  );
};