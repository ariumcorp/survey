// Tipos básicos para una pregunta y sus opciones
export interface IQuestionChoice {
  value: string;
  text: string;
}

export interface ISurveyQuestion {
  type: string;
  name: string;
  title: string;
  // Propiedades opcionales que varían según el tipo
  choices?: IQuestionChoice[];
  inputType?: "text" | "email" | "number" | "password";
  isRequired?: boolean;
}

export interface ISurveyBuilderState {
  _id: "";
  _rev: "";
  title: string;
  description: string;
  type: string;
  elements: ISurveyQuestion[];
}

export function createEmptySurveyBuilderState(): ISurveyBuilderState {
  return {
    _id: "",
    _rev: "",
    title: "Mi Encuesta",
    type: "survey",
    description: "Por favor, complete la siguiente encuesta.",
    elements: [],
  };
}
