import React, { useState, useRef, useEffect } from "react";
import "./ControladorVentana.css";

interface ControladorVentanaProps {
  titulo: string;
  children: React.ReactNode;
  onCerrar?: () => void;
  minimizable?: boolean;
  maximizable?: boolean;
  redimensionable?: boolean;
  posicionInicial?: { x: number; y: number };
  tamanoInicial?: { ancho: number; alto: number };
}

export const ControladorVentana: React.FC<ControladorVentanaProps> = ({
  titulo,
  children,
  onCerrar,
  minimizable = true,
  maximizable = true,
  posicionInicial = { x: 100, y: 100 },
  tamanoInicial = { ancho: 800, alto: 600 },
}) => {
  const [minimizada, setMinimizada] = useState(false);
  const [maximizada, setMaximizada] = useState(false);
  const [posicion, setPosicion] = useState(posicionInicial);
  const [tamano, setTamano] = useState(tamanoInicial);
  const [arrastrando, setArrastrando] = useState(false);
  const [redimensionando, setRedimensionando] = useState(false);
  const [posicionAnterior, setPosicionAnterior] = useState(posicionInicial);
  const [tamanoAnterior, setTamanoAnterior] = useState(tamanoInicial);

  const ventanaRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  const manejarInicioArrastre = (e: React.MouseEvent) => {
    if (maximizada) return;

    setArrastrando(true);
    const rect = ventanaRef.current?.getBoundingClientRect();
    if (rect) {
      offsetRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const manejarMovimiento = (e: MouseEvent) => {
    if (arrastrando && !maximizada) {
      setPosicion({
        x: e.clientX - offsetRef.current.x,
        y: e.clientY - offsetRef.current.y,
      });
    }
  };

  const manejarFinArrastre = () => {
    setArrastrando(false);
    setRedimensionando(false);
  };

  const manejarMinimizar = () => {
    setMinimizada(!minimizada);
  };

  const manejarMaximizar = () => {
    if (maximizada) {
      setPosicion(posicionAnterior);
      setTamano(tamanoAnterior);
      setMaximizada(false);
    } else {
      setPosicionAnterior(posicion);
      setTamanoAnterior(tamano);
      setPosicion({ x: 0, y: 0 });
      setTamano({ ancho: window.innerWidth, alto: window.innerHeight });
      setMaximizada(true);
    }
  };

  const manejarCerrar = () => {
    if (onCerrar) {
      onCerrar();
    }
  };

  useEffect(() => {
    if (arrastrando || redimensionando) {
      document.addEventListener("mousemove", manejarMovimiento);
      document.addEventListener("mouseup", manejarFinArrastre);

      return () => {
        document.removeEventListener("mousemove", manejarMovimiento);
        document.removeEventListener("mouseup", manejarFinArrastre);
      };
    }
  }, [arrastrando, redimensionando]);

  const estiloVentana = {
    position: "fixed" as const,
    left: posicion.x,
    top: posicion.y,
    width: tamano.ancho,
    height: minimizada ? "auto" : tamano.alto,
    zIndex: 1000,
    transform: maximizada ? "none" : undefined,
  };

  return (
    <div
      ref={ventanaRef}
      className={`ventana-personalizada ${maximizada ? "maximizada" : ""} ${
        minimizada ? "minimizada" : ""
      }`}
      style={estiloVentana}
    >
      <div
        className="barra-titulo"
        onMouseDown={manejarInicioArrastre}
        onDoubleClick={maximizable ? manejarMaximizar : undefined}
      >
        <div className="titulo-ventana">
          <i className="bi bi-window me-2"></i>
          {titulo}
        </div>
        <div className="controles-ventana">
          {minimizable && (
            <button
              className="btn-control minimizar"
              onClick={manejarMinimizar}
              title="Minimizar"
            >
              <i className="bi bi-dash"></i>
            </button>
          )}
          {maximizable && (
            <button
              className="btn-control maximizar"
              onClick={manejarMaximizar}
              title={maximizada ? "Restaurar" : "Maximizar"}
            >
              <i
                className={`bi ${
                  maximizada ? "bi-window-stack" : "bi-window"
                }`}
              ></i>
            </button>
          )}
          <button
            className="btn-control cerrar"
            onClick={manejarCerrar}
            title="Cerrar"
          >
            <i className="bi bi-x"></i>
          </button>
        </div>
      </div>
      {!minimizada && <div className="contenido-ventana">{children}</div>}
    </div>
  );
};