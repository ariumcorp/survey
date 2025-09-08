import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Box, Button, Paper } from "@mui/material";
import { SurveyQuestionElementBase } from "survey-react-ui"; // ¡Importación clave!

export class SurveyQuestionPhotoTaker extends SurveyQuestionElementBase {
  // El constructor es estándar para componentes de clase de React
  // constructor(props: any) {
  //   super(props);
  // }

  // Accedemos a la pregunta a través del getter de la clase base
  get question() {
    return this.questionBase;
  }

  // El método para tomar la foto ahora es un método de la clase
  takePicture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });
      const imageDataUrl = `data:image/jpeg;base64,${image.base64String}`;

      // Actualizamos el valor directamente en el modelo de la pregunta
      this.question.value = imageDataUrl;
      // No es necesario llamar a setState, SurveyJS maneja la actualización
    } catch (error) {
      console.error("Captura de foto cancelada.", error);
    }
  };

  clearPhoto = () => {
    this.question.value = null;
  };

  // El JSX va dentro del método renderElement() de la clase base
  renderElement() {
    const photoBase64 = this.question.value;

    return (
      <Paper sx={{ p: 2, mt: 1, border: "1px solid #ddd" }}>
        {/* La clase base ya renderiza el título y la descripción, por lo que no es necesario repetirlos */}
        <Box sx={{ mt: 1, textAlign: "center" }}>
          {!photoBase64 ? (
            <Button
              variant="contained"
              startIcon={<PhotoCamera />}
              onClick={this.takePicture}
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
                onClick={this.clearPhoto}
              >
                Eliminar Foto
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    );
  }
}
