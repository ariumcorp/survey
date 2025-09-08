import { ReactElement } from "react";
import { createRoot } from "react-dom/client";
import { VisualizerBase, VisualizationManager } from "survey-analytics";

// --- PASO 1: MODIFICAR EL COMPONENTE PhotoGallery ---
// Ahora acepta una prop 'questionName' para saber qué propiedad buscar.
const PhotoGallery = ({
  data,
  questionName,
}: {
  data: any[];
  questionName: string;
}): ReactElement => {
  // --- LÓGICA CORREGIDA ---
  // En lugar de buscar 'item.value', usamos el 'questionName' dinámico
  // para encontrar la propiedad correcta en cada objeto de resultado.
  const imageSources = data.map((item) => item[questionName]).filter(Boolean);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {imageSources.map((src, index) => (
        <a href={src} target="_blank" rel="noopener noreferrer" key={index}>
          <img
            src={src}
            alt={`Resultado ${index + 1}`}
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </a>
      ))}
    </div>
  );
};

// La clase del visualizador que SurveyJS Analytics usará
export class PhotoGalleryVisualizer extends VisualizerBase {
  // constructor(question: any, data: any[], options?: any) {
  //   super(question, data, options);
  // }

  public getDisplayName(chartType: string): string {
    return "Galería de Imágenes";
  }

  render(container: HTMLElement): void {
    const root = createRoot(container);

    // --- PASO 2: PASAR EL NOMBRE DE LA PREGUNTA COMO PROP ---
    // this.question.name contiene el nombre de la pregunta actual (ej: "foto_evidencia").
    // Se lo pasamos como prop al componente PhotoGallery.
    root.render(
      <PhotoGallery data={this.data} questionName={this.question.name} />
    );
  }
}

// La función de registro no cambia
export function registerAnalyticsWidgets() {
  VisualizationManager.registerVisualizer("photo", PhotoGalleryVisualizer);
}
