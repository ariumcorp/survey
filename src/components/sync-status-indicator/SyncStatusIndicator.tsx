import React, { useState, useEffect } from "react";
//import { dbService, ReplicationStatus } from '../services/db'; // Importamos la instancia
import { Chip, Tooltip } from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import ErrorIcon from "@mui/icons-material/Error";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import { dbService, ReplicationStatus } from "services";

const statusConfig = {
  active: { label: "Sincronizando", icon: <SyncIcon />, color: "primary" },
  paused: { label: "Sincronizado", icon: <CloudDoneIcon />, color: "success" },
  denied: { label: "Error de Acceso", icon: <ErrorIcon />, color: "error" },
  error: { label: "Error de Conexión", icon: <CloudOffIcon />, color: "error" },
  idle: { label: "Desconectado", icon: <CloudOffIcon />, color: "default" },
};

export const SyncStatusIndicator: React.FC = () => {
  const [status, setStatus] = useState<ReplicationStatus>("idle");

  useEffect(() => {
    // --- Conectamos el componente a los eventos del servicio ---

    // Función para actualizar el estado del componente
    const handleStatusChange = (newStatus: ReplicationStatus) => {
      setStatus(newStatus);
    };

    // Nos suscribimos al evento 'statusChange'
    dbService.events.on("statusChange", handleStatusChange);

    // Iniciamos la replicación cuando el componente se monta
    dbService.startReplication();

    // --- Limpieza ---
    // Nos desuscribimos del evento y detenemos la replicación
    // cuando el componente se desmonta.
    return () => {
      dbService.events.off("statusChange", handleStatusChange);
      // Opcional: podrías decidir no detener la replicación aquí
      // si quieres que siga activa en toda la app.
      // dbService.stopReplication();
    };
  }, []); // El array vacío asegura que esto se ejecute solo una vez

  const config = statusConfig[status] || statusConfig.idle;

  return (
    <Tooltip title={config.label}>
      <Chip
        icon={config.icon}
        label={config.label}
        color={config.color as any}
        variant="outlined"
        size="small"
      />
    </Tooltip>
  );
};
