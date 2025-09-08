import { z } from "zod";

// export const SurveyConfigStateSchema = z.object({
//   showPreview: z.boolean(),
//   showQuestionNumbers: z.enum(["on", "off"]),
//   questionTitleLocation: z.enum(["top", "bottom", "left"]),
//   showProgressBar: z.enum(["off", "top", "bottom"]),
//   progressBarType: z.enum(["pages", "questions"]),
//   goNextPageAutomatic: z.boolean(),
// });

// export type SurveyConfigStateModel = z.infer<typeof SurveyConfigStateSchema>;

export interface ISurveyConfigState {
  // --- Comportamiento General ---
  mode: "edit" | "display";
  allowCompleteSurveyAutomatic: boolean;
  checkErrorsMode:
    | "onNextPage"
    | "onValueChanged"
    | "onValueChanging"
    | "never";
  clearInvisibleValues: "none" | "onHidden" | "onComplete";
  goNextPageAutomatic: boolean;

  // --- Apariencia y UI ---
  widthMode: "static" | "responsive" | "auto";
  showBrandInfo: boolean;
  showPreview: boolean;
  showQuestionNumbers: "on" | "onpage" | "off";
  questionTitleLocation: "top" | "bottom" | "left";
  questionDescriptionLocation: "underTitle" | "underInput";

  // --- Navegación ---
  showNavigationButtons: "top" | "bottom" | "both" | "none";
  showPrevButton: boolean;
  showProgressBar: "off" | "top" | "bottom";
  progressBarType: "pages" | "questions";
  pagePrevText: string;
  pageNextText: string;
  completeText: string;

  // --- Finalización ---
  showCompletedPage: boolean;
  completedHtml: string;
}

export function createEmptySurveyConfigState(): ISurveyConfigState {
  return {
    // Comportamiento General
    mode: "edit",
    allowCompleteSurveyAutomatic: false,
    checkErrorsMode: "onNextPage",
    clearInvisibleValues: "onComplete",
    goNextPageAutomatic: false,

    // Apariencia y UI
    widthMode: "responsive",
    showBrandInfo: false,
    showPreview: false,
    showQuestionNumbers: "on",
    questionTitleLocation: "top",
    questionDescriptionLocation: "underTitle",

    // Navegación
    showNavigationButtons: "bottom",
    showPrevButton: true,
    showProgressBar: "top",
    progressBarType: "pages",
    pagePrevText: "Anterior",
    pageNextText: "Siguiente",
    completeText: "Finalizar",

    // Finalización
    showCompletedPage: true,
    completedHtml: "<h3>Gracias por completar la encuesta.</h3>",
  };
}

export interface IUpdateConfigPayload {
  key: keyof ISurveyConfigState;
  value: any;
}
