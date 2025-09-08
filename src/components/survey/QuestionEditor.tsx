import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "redux-store/store";
import { removeQuestion, updateQuestion } from "redux-store/thunk";

// Hacemos que la prop `question` sea más flexible para el editor
interface QuestionEditorProps {
  question: any;
  index: number;
}

export const QuestionEditor: React.FC<QuestionEditorProps> = ({
  question,
  index,
}) => {
  const dispatch = useDispatch();

  const handleQuestionChange = (prop: string, value: any) => {
    dispatch(
      updateQuestion({ index, updatedQuestion: { ...question, [prop]: value } })
    );
  };

  const handleChoiceChange = (choiceIndex: number, value: string) => {
    const newChoices = [...question.choices];
    newChoices[choiceIndex] = {
      ...newChoices[choiceIndex],
      text: value,
      value: value.toLowerCase().replace(/\s/g, ""),
    };
    handleQuestionChange("choices", newChoices);
  };

  const addChoice = () => {
    const newChoice = {
      value: `item${question.choices.length + 1}`,
      text: `Opción ${question.choices.length + 1}`,
    };
    handleQuestionChange("choices", [...question.choices, newChoice]);
  };

  const removeChoice = (choiceIndex: number) => {
    const newChoices = question.choices.filter(
      (_: any, idx: number) => idx !== choiceIndex
    );
    handleQuestionChange("choices", newChoices);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
          {index + 1}. {question.type}
        </Typography>
        <IconButton
          onClick={() => dispatch(removeQuestion({ index }))}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      </Box>

      <TextField
        label="Nombre (ID único)"
        value={question.name}
        onChange={(e) => handleQuestionChange("name", e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Título (la pregunta real)"
        value={question.title}
        onChange={(e) => handleQuestionChange("title", e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <FormControlLabel
        control={
          <Switch
            checked={question.isRequired || false}
            onChange={(e) =>
              handleQuestionChange("isRequired", e.target.checked)
            }
          />
        }
        label="Es requerida"
      />

      {/* --- Campos Específicos por Tipo --- */}
      {question.type === "text" && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Tipo de Campo</InputLabel>
          <Select
            value={question.inputType || "text"}
            onChange={(e: SelectChangeEvent) =>
              handleQuestionChange("inputType", e.target.value)
            }
            label="Tipo de Campo"
          >
            <MenuItem value="text">Texto</MenuItem>
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="number">Número</MenuItem>
            <MenuItem value="password">Contraseña</MenuItem>
          </Select>
        </FormControl>
      )}

      {(question.type === "checkbox" ||
        question.type === "radiogroup" ||
        question.type === "dropdown") && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Opciones</Typography>
          {question.choices?.map((choice: any, choiceIndex: number) => (
            <Box
              key={choiceIndex}
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <TextField
                value={choice.text}
                onChange={(e) =>
                  handleChoiceChange(choiceIndex, e.target.value)
                }
                fullWidth
                size="small"
              />
              <IconButton
                onClick={() => removeChoice(choiceIndex)}
                size="small"
                sx={{ ml: 1 }}
              >
                {" "}
                <DeleteIcon fontSize="small" />{" "}
              </IconButton>
            </Box>
          ))}
          <Button onClick={addChoice} variant="outlined" size="small">
            Añadir Opción
          </Button>
        </Box>
      )}
    </Paper>
  );
};
