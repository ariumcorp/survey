import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import {
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { ISurveyBuilderState } from "models";
import { authSelector, surveysSelector } from "redux-store/selectors";
import { useDispatch, useSelector } from "redux-store/store";
import {
  fetchAllSurveys,
  setAnswerSurveyMeta,
  setUpdateSurveyMeta,
} from "redux-store/thunk";
import { dbService } from "services";
import { useNavigate } from "react-router";
import { PagePath } from "utils/enums";

export const SurveyList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { surveys, status } = useSelector(surveysSelector);
  const { email } = useSelector(authSelector);
  const showButton = email === "admin";

  // Efecto para la carga inicial de datos
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllSurveys());
    }
  }, [status, dispatch]);

  const handleDeleteSurvey = async (doc: ISurveyBuilderState) => {
    if (
      window.confirm(
        `¿Estás seguro de que quieres eliminar la encuesta "${doc.title}"?`
      )
    ) {
      try {
        // El método remove de PouchDB requiere el documento completo con _id y _rev
        await dbService.localDb.remove(doc as any);
      } catch (error) {
        console.error("Error al eliminar la encuesta:", error);
      }
    }
  };

  const handleEditSurvey = async (doc: ISurveyBuilderState) => {
    try {
      dispatch(setUpdateSurveyMeta(doc));
      navigate(PagePath.SurveysConfig);
    } catch (error) {
      console.error("Error al eliminar la encuesta:", error);
    }
  };

  const handleViewSurvey = async (doc: ISurveyBuilderState) => {
    try {
      dispatch(setAnswerSurveyMeta({ ...doc }));
      navigate(PagePath.AnswerSurvey);
    } catch (error) {
      console.error("Error al eliminar la encuesta:", error);
    }
  };

  const handleViewAnalyticsSurvey = async (doc: ISurveyBuilderState) => {
    try {
      dispatch(setUpdateSurveyMeta(doc));
      navigate(PagePath.Dashboard);
    } catch (error) {
      console.error("Error al eliminar la encuesta:", error);
    }
  };

  if (status === "loading") {
    return <CircularProgress />;
  }

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Encuestas Creadas
      </Typography>
      <List>
        {surveys.length === 0 ? (
          <ListItem>
            <ListItemText primary="No hay encuestas guardadas." />
          </ListItem>
        ) : (
          surveys.map((survey) => (
            <ListItem
              key={survey._id}
              secondaryAction={
                // <IconButton
                //   edge="end"
                //   aria-label="delete"
                //   onClick={() => handleDeleteSurvey(survey)}
                // >
                //   <DeleteIcon />
                // </IconButton>
                <Stack direction="row" spacing={1}>
                  {showButton && (
                    <IconButton
                      edge="end"
                      aria-label="view"
                      onClick={() => handleViewAnalyticsSurvey(survey)}
                    >
                      <AnalyticsIcon />
                    </IconButton>
                  )}

                  <IconButton
                    edge="end"
                    aria-label="view"
                    onClick={() => handleViewSurvey(survey)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  {showButton && (
                    <IconButton
                      edge="end"
                      aria-label="view"
                      onClick={() => handleEditSurvey(survey)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                  {showButton && (
                    <IconButton
                      edge="end"
                      aria-label="view"
                      onClick={() => handleDeleteSurvey(survey)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Stack>
              }
            >
              <ListItemText
                primary={survey.title}
                secondary={survey.description}
              />
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  );
};
