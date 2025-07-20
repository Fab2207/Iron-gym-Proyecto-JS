import React from "react";
import {
  ProveedorGestorVentanas,
} from "../../components/ventanas/GestorVentanas";
import ContenidoDashboardReceptionista from '../Recepcionista/ContenidoDashboardReceptionista';

const DashboardReceptionist: React.FC = () => {
  return (
    <ProveedorGestorVentanas>
      <ContenidoDashboardReceptionista />
    </ProveedorGestorVentanas>
  );
};

export default DashboardReceptionist;