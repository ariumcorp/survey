import AddCircleIcon from "@mui/icons-material/AddCircle";

import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { surveyBuilderSelector } from "redux-store/selectors";
import { useDispatch, useSelector } from "redux-store/store";
import {
  addQuestion,
  cleanSurveyBuilder,
  updateSurveyMeta,
} from "redux-store/thunk";
import { QuestionEditor } from "./QuestionEditor";
import { dbService } from "services";

const questionTypes = [
  { type: "text", label: "Texto" },
  { type: "checkbox", label: "Casillas de Verificación" },
  { type: "radiogroup", label: "Opciones Múltiples" },
  { type: "dropdown", label: "Menú Desplegable" },
  { type: "comment", label: "Área de Texto" },
  { type: "boolean", label: "Sí/No" },
  { type: "rating", label: "Calificación" },
  { type: "photo", label: "Cámara (Foto)" },
];

export const SurveyBuilder: React.FC = () => {
  const dispatch = useDispatch();
  const surveyJson = useSelector(surveyBuilderSelector);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  console.log("surveyJson", surveyJson);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleAddQuestion = (type: string) => {
    dispatch(addQuestion({ type }));
    handleMenuClose();
  };

  const handleSaveSurvey = async () => {
    try {
      const id = surveyJson._id.length
        ? surveyJson._id
        : `survey_${new Date().toISOString()}`;
      const rev = surveyJson._rev.length ? surveyJson._rev : undefined;

      const surveyResult = {
        ...surveyJson,
        _id: id, // Un ID único basado en la fecha
        _rev: rev,
        type: "survey",
      };

      // 2. Llama al método putDoc de nuestro servicio
      const response = await dbService.putDoc(surveyResult);

      console.log("✅ Documento guardado localmente con éxito:", response);
      alert("¡Resultados guardados y en proceso de sincronización!");
      dispatch(cleanSurveyBuilder());
    } catch (err) {
      console.error("❌ Error al guardar el documento:", err);
      alert("Hubo un error al guardar los resultados.");
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 4 }}>
      {/* Columna Izquierda: Panel de Construcción */}
      <Box sx={{ flex: 2 }}>
        <Typography variant="h4" gutterBottom>
          Crear encuestas de Encuestas
        </Typography>
        <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
          <TextField
            label="Título de la Encuesta"
            value={surveyJson.title}
            onChange={(e) =>
              dispatch(
                updateSurveyMeta({ key: "title", value: e.target.value })
              )
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descripción"
            value={surveyJson.description}
            onChange={(e) =>
              dispatch(
                updateSurveyMeta({ key: "description", value: e.target.value })
              )
            }
            fullWidth
            margin="normal"
          />
        </Paper>

        {surveyJson.elements.map((question, index) => (
          <QuestionEditor
            key={question.name}
            index={index}
            question={question}
          />
        ))}

        <Box sx={{ textAlign: "center" }}>
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              onClick={handleMenuClick}
            >
              Añadir Pregunta
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
              {questionTypes.map((q) => (
                <MenuItem
                  key={q.type}
                  onClick={() => handleAddQuestion(q.type)}
                >
                  {q.label}
                </MenuItem>
              ))}
            </Menu>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveSurvey}
            >
              Guardar
            </Button>
          </ButtonGroup>
        </Box>
      </Box>

      {/* Columna Derecha: Vista del JSON */}
      {/* <Box sx={{ flex: 1 }}>
        <Typography variant="h5" gutterBottom>
          JSON en Tiempo Real
        </Typography>
        <Paper
          component="pre"
          elevation={2}
          sx={{
            p: 2,
            overflowX: "auto",
            background: "#f5f5f5",
            height: "100%",
          }}
        >
          {JSON.stringify(surveyJson, null, 2)}
        </Paper>
      </Box> */}
    </Box>
  );
};
