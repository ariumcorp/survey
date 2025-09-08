import "survey-core/survey-core.min.css";
import React, { useEffect, useMemo } from "react";
import {
  answerSurveySelector,
  authSelector,
  surveyConfigSelector,
} from "redux-store/selectors";
import { useSelector } from "redux-store/store";
import { dbService } from "services";
//import { useSelector } from 'react-redux';
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
//import { dbService } from '../services/db'; // Asegúrate que la ruta sea correcta
// Tus selectores de Redux
//import { surveyConfigSelector, answerSurveySelector } from '../redux-store/selectors';

export const MySurveyComponent: React.FC = () => {
  console.log("--- MySurveyComponent Start ---");
  const surveyConfig = useSelector(surveyConfigSelector);
  const surveyJson = useSelector(answerSurveySelector);
  const { email } = useSelector(authSelector);

  const surveyModel = useMemo(() => new Model(surveyJson), [surveyJson]);

  // Este useEffect para aplicar la configuración está perfecto.
  useEffect(() => {
    Object.assign(surveyModel, surveyConfig);
    surveyModel.render();
  }, [surveyConfig, surveyModel]);

  // --- SOLUCIÓN: MANEJAR EL EVENTO onComplete EN SU PROPIO useEffect ---
  useEffect(() => {
    // 1. Define la función que manejará el evento.
    const handleComplete = async (sender: any) => {
      console.log("Resultados de la encuesta:", sender.data);
      try {
        const answerResult = {
          _id: `answer_${new Date().toISOString()}`,
          surveyId: surveyJson._id, // Asegúrate de que surveyJson tiene _id
          answers: sender.data,
          type: "answer",
          email,
        };
        const response = await dbService.putDoc(answerResult);
        console.log("✅ Documento guardado localmente con éxito:", response);
      } catch (err) {
        console.error("❌ Error al guardar el documento:", err);
        alert("Hubo un error al guardar los resultados.");
      }
    };

    // 2. Añade el oyente al modelo de la encuesta.
    surveyModel.onComplete.add(handleComplete);

    // 3. ¡LA PARTE MÁS IMPORTANTE! Retorna una función de limpieza.
    // React la ejecutará cuando el componente se desmonte.
    return () => {
      surveyModel.onComplete.remove(handleComplete);
    };
  }, [surveyModel, surveyJson, email]); // El efecto se vuelve a ejecutar si el modelo o el JSON cambian.

  return <Survey model={surveyModel} />;
};
