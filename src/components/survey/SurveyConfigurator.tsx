import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { ISurveyConfigState } from "models";
import React from "react";

import { surveyConfigSelector } from "redux-store/selectors";
import { useDispatch, useSelector } from "redux-store/store";
import { updateConfig } from "redux-store/thunk";

export const SurveyConfigurator: React.FC = () => {
  const dispatch = useDispatch();
  const config = useSelector(surveyConfigSelector);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    dispatch(
      updateConfig({ key: name as keyof ISurveyConfigState, value: checked })
    );
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    dispatch(updateConfig({ key: name as keyof ISurveyConfigState, value }));
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(updateConfig({ key: name as keyof ISurveyConfigState, value }));
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ p: 1 }}>
        Configuración de Encuesta
      </Typography>

      {/* --- Sección de Comportamiento --- */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Comportamiento General</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={config.goNextPageAutomatic}
                  onChange={handleSwitchChange}
                  name="goNextPageAutomatic"
                />
              }
              label="Avance automático de página"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={config.allowCompleteSurveyAutomatic}
                  onChange={handleSwitchChange}
                  name="allowCompleteSurveyAutomatic"
                />
              }
              label="Finalización automática"
            />
          </FormGroup>
          <FormControl fullWidth margin="normal">
            <InputLabel>Modo de validación</InputLabel>
            <Select
              name="checkErrorsMode"
              value={config.checkErrorsMode}
              label="Modo de validación"
              onChange={handleSelectChange}
            >
              <MenuItem value="onNextPage">Al cambiar de página</MenuItem>
              <MenuItem value="onValueChanged">Al cambiar un valor</MenuItem>
              <MenuItem value="never">Nunca</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Limpiar valores invisibles</InputLabel>
            <Select
              name="clearInvisibleValues"
              value={config.clearInvisibleValues}
              label="Limpiar valores invisibles"
              onChange={handleSelectChange}
            >
              <MenuItem value="onComplete">Al finalizar</MenuItem>
              <MenuItem value="onHidden">Al ocultarse</MenuItem>
              <MenuItem value="none">Nunca</MenuItem>
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      {/* --- Sección de Apariencia --- */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Apariencia y UI</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={config.showPreview}
                  onChange={handleSwitchChange}
                  name="showPreview"
                />
              }
              label="Mostrar vista previa"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={config.showBrandInfo}
                  onChange={handleSwitchChange}
                  name="showBrandInfo"
                />
              }
              label="Mostrar info de la marca"
            />
          </FormGroup>
          <FormControl fullWidth margin="normal">
            <InputLabel>Numeración de preguntas</InputLabel>
            <Select
              name="showQuestionNumbers"
              value={config.showQuestionNumbers}
              label="Numeración de preguntas"
              onChange={handleSelectChange}
            >
              <MenuItem value="on">Global</MenuItem>
              <MenuItem value="onpage">Por página</MenuItem>
              <MenuItem value="off">Ocultar</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Posición del título</InputLabel>
            <Select
              name="questionTitleLocation"
              value={config.questionTitleLocation}
              label="Posición del título"
              onChange={handleSelectChange}
            >
              <MenuItem value="top">Arriba</MenuItem>
              <MenuItem value="bottom">Abajo</MenuItem>
              <MenuItem value="left">Izquierda</MenuItem>
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      {/* --- Sección de Navegación --- */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Navegación</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={config.showPrevButton}
                  onChange={handleSwitchChange}
                  name="showPrevButton"
                />
              }
              label="Mostrar botón 'Anterior'"
            />
          </FormGroup>
          <FormControl fullWidth margin="normal">
            <InputLabel>Barra de Progreso</InputLabel>
            <Select
              name="showProgressBar"
              value={config.showProgressBar}
              label="Barra de Progreso"
              onChange={handleSelectChange}
            >
              <MenuItem value="off">Oculta</MenuItem>
              <MenuItem value="top">Arriba</MenuItem>
              <MenuItem value="bottom">Abajo</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="pagePrevText"
            label="Texto botón 'Anterior'"
            value={config.pagePrevText}
            onChange={handleTextChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="pageNextText"
            label="Texto botón 'Siguiente'"
            value={config.pageNextText}
            onChange={handleTextChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="completeText"
            label="Texto botón 'Finalizar'"
            value={config.completeText}
            onChange={handleTextChange}
            fullWidth
            margin="normal"
          />
        </AccordionDetails>
      </Accordion>

      {/* --- Sección de Finalización --- */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Finalización</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={config.showCompletedPage}
                  onChange={handleSwitchChange}
                  name="showCompletedPage"
                />
              }
              label="Mostrar página de agradecimiento"
            />
          </FormGroup>
          <TextField
            name="completedHtml"
            label="HTML de página finalizada"
            value={config.completedHtml}
            onChange={handleTextChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};
