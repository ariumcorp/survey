import React, { useState } from "react";
import { Outlet, useLocation } from "react-router";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { AnimatePresence } from "framer-motion";

import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";
import { styled, Theme } from "@mui/material/styles";
import { BottomNavBar, SideMenu } from "components";
import { useDispatch } from "redux-store/store";
import { logout } from "redux-store/thunk";

const drawerWidthOpen = 240;
const drawerWidthCollapsed = 60; // Ancho del menú colapsado

// Creamos un componente Drawer estilizado para manejar las transiciones de ancho
const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }: { theme: Theme; open?: boolean }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: open ? drawerWidthOpen : drawerWidthCollapsed,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    overflowX: "hidden",
  },
}));

export const Layout = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  // Estado para controlar si el menú de escritorio está abierto o colapsado
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const handleDrawerOpenToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Ancho actual del drawer basado en el estado
  const currentDrawerWidth = isDrawerOpen
    ? drawerWidthOpen
    : drawerWidthCollapsed;

  return (
    <AnimatePresence mode="wait">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: theme.zIndex.drawer + 1,
            // La AppBar se ajusta dinámicamente al ancho del menú
            width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
            ml: { sm: `${currentDrawerWidth}px` },
            transition: theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Emilia - Encuestas
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Tooltip title="Cerrar Sesión">
              <IconButton
                color="inherit"
                onClick={() => {
                  console.log("Cerrando sesión...");
                  dispatch(logout());
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        {!isMobile && (
          <StyledDrawer variant="permanent" open={isDrawerOpen}>
            {/* Pasamos el estado y la función de toggle al SideMenu */}
            <SideMenu isOpen={isDrawerOpen} onToggle={handleDrawerOpenToggle} />
          </StyledDrawer>
        )}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
            // 1. Ocupa toda la altura de la pantalla
            height: "95vh",
            // 2. Muestra la barra de scroll vertical solo cuando sea necesario
            overflowY: "auto",
            // Mantenemos el padding inferior para la barra de navegación móvil
            pb: { xs: 8, sm: 3 },
          }}
        >
          <Toolbar />
          <Outlet key={location.pathname} />
        </Box>

        {isMobile && <BottomNavBar />}
      </Box>
    </AnimatePresence>
  );
};
