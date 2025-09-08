import React, { useEffect, useRef } from "react";
import { Model } from "survey-core";
// La importación del modelo es correcta como en la demo
import { VisualizationPanel } from "survey-analytics";

// Importa los estilos
import "survey-analytics/survey.analytics.min.css";

interface SurveyAnalyticsDashboardProps {
  surveyJson: any;
  surveyResults: any[];
}

export const SurveyAnalyticsDashboard: React.FC<
  SurveyAnalyticsDashboardProps
> = ({ surveyJson, surveyResults }) => {
  // 1. Creamos una referencia para el div que contendrá los gráficos
  const vizPanelContainerRef = useRef<HTMLDivElement>(null);

  // 2. Usamos useEffect para manejar la lógica de renderizado
  // Se ejecutará cada vez que el JSON o los resultados cambien
  useEffect(() => {
    // Nos aseguramos de que el div exista y haya resultados
    if (
      !vizPanelContainerRef.current ||
      !surveyResults ||
      surveyResults.length === 0
    ) {
      return;
    }

    const survey = new Model(surveyJson);
    const vizPanelOptions = {};

    // 3. Creamos la instancia del modelo, como en la demo
    const vizPanel = new VisualizationPanel(
      survey.getAllQuestions(),
      surveyResults,
      vizPanelOptions
    );

    // 4. Limpiamos el contenedor y le pedimos al modelo que se renderice dentro de él
    vizPanelContainerRef.current.innerHTML = "";
    vizPanel.render(vizPanelContainerRef.current);
  }, [surveyJson, surveyResults]); // Dependencias del efecto

  if (!surveyResults || surveyResults.length === 0) {
    return <h3>No hay resultados para mostrar.</h3>;
  }

  // 5. El JSX es simplemente un div vacío que le pasamos a la referencia
  return <div ref={vizPanelContainerRef} />;
};
