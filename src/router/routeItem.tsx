import AssignmentIcon from "@mui/icons-material/Assignment";
//import BarChartIcon from "@mui/icons-material/BarChart";
//import HomeIcon from "@mui/icons-material/Home";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { PagePath } from "utils/enums";

export const menuItems = [
  // { text: "Inicio", path: PagePath.Root, icon: <HomeIcon /> },
  { text: "Encuestas", path: PagePath.Root, icon: <AssignmentIcon /> },
  {
    text: "Crear Encuetas",
    path: PagePath.SurveysConfig,
    icon: <NoteAddIcon />,
  },
  // { text: "Dashboard", path: PagePath.Dashboard, icon: <BarChartIcon /> },
];
