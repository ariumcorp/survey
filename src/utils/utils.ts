import { ISurveyQuestion } from "models";

export const getKeyEncrypt = (): string => {
  return process.env.REACT_APP_REDUX_PERSIST_ENCRYPT!;
};

export const isProd = (): boolean => {
  return process.env.REACT_APP_IS_PROD!.toLowerCase() === "true";
};

export const sanitize = (s: string) =>
  s.normalize("NFC").replace(/\p{Cf}+/gu, "");

export const equalsClean = (a: string, b: string) =>
  sanitize(a) === sanitize(b);

// Función helper para generar una pregunta por defecto según el tipo
export const createDefaultQuestion = (type: string): ISurveyQuestion => {
  const uniqueName = `${type}_${Date.now()}`;
  const baseQuestion = {
    name: uniqueName,
    title: "Nueva Pregunta",
    type,
    isRequired: false,
  };

  switch (type) {
    case "checkbox":
    case "radiogroup":
    case "dropdown":
      return {
        ...baseQuestion,
        choices: [{ value: "item1", text: "Opción 1" }],
      };
    case "text":
      return { ...baseQuestion, inputType: "text" };
    default:
      return baseQuestion;
  }
};
