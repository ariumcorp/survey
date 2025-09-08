import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { authSelector } from "redux-store/selectors";
import { useSelector } from "redux-store/store";
import { menuItems } from "router/routeItem";

export const BottomNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = useSelector(authSelector);
  // El valor actual se sincroniza con la ruta del navegador
  const currentValue = location.pathname;

  const menu = email === "admin" ? menuItems : [menuItems[0]];

  return (
    // Paper envuelve el BottomNavigation para darle elevación (sombra)
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1100, // Asegura que esté por encima del contenido
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={currentValue}
        onChange={(event, newValue) => {
          navigate(newValue); // Navega a la nueva ruta al hacer clic
        }}
      >
        {menu.map((item) => (
          <BottomNavigationAction
            key={item.text}
            label={item.text}
            value={item.path}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};
