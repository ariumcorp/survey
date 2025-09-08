import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";

// SurveyJS nos pasará la pregunta como prop
interface PhotoTakerProps {
  question: any;
}

export const PhotoTakerWidget: React.FC<PhotoTakerProps> = ({ question }) => {
  // El valor de la pregunta será la foto en formato Base64
  const photoBase64 = question.value;

  const takePicture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64, // Clave para guardarlo en el JSON
        source: CameraSource.Camera,
      });

      // El formato Data URL es ideal para mostrar en <img> y almacenar
      const imageDataUrl = `data:image/jpeg;base64,${image.base64String}`;

      // ¡Aquí está la magia! Actualizamos el valor de la pregunta en el modelo de SurveyJS
      question.value = imageDataUrl;
    } catch (error) {
      console.error("El usuario canceló la captura de la foto.", error);
    }
  };

  const clearPhoto = () => {
    question.value = null; // Limpiamos el valor en el modelo de la encuesta
  };

  return (
    <Paper sx={{ p: 2, mt: 1, border: "1px solid #ddd" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {question.title}
      </Typography>
      {question.description && (
        <Typography variant="body2" color="text.secondary">
          {question.description}
        </Typography>
      )}

      <Box sx={{ mt: 2, textAlign: "center" }}>
        {!photoBase64 ? (
          <Button
            variant="contained"
            startIcon={<PhotoCamera />}
            onClick={takePicture}
          >
            Tomar Foto
          </Button>
        ) : (
          <Box>
            <img
              src={photoBase64}
              alt="Foto tomada"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            />
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={clearPhoto}
            >
              Eliminar Foto
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
};
