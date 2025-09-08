import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink, useLocation } from "react-router";
import { authSelector } from "redux-store/selectors";
import { useSelector } from "redux-store/store";
import { menuItems } from "router/routeItem";

// Definimos la estructura de las props
interface SideMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const SideMenu = ({ isOpen, onToggle }: SideMenuProps) => {
  const { email } = useSelector(authSelector);
  const location = useLocation();
  const menu = email === "admin" ? menuItems : [menuItems[0]];
  return (
    <Box>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        {/* Mostramos el título solo cuando el menú está abierto */}
        {isOpen && <Typography sx={{ flexGrow: 1, ml: 2 }}>Menú</Typography>}
        <IconButton onClick={onToggle}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {menu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                sx={{
                  minHeight: 48,
                  justifyContent: isOpen ? "initial" : "center",
                  px: 2.5,
                }}
                style={{
                  backgroundColor: isActive ? "rgba(0, 0, 0, 0.08)" : "",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isOpen ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {/* El texto solo se muestra si el menú está abierto */}
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: isOpen ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
