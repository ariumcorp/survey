export interface IProcessedSurveys {
  _id: string;
  _rev: string;
  surveyId: string;
  answers: any;
  type: string;
  email: string;
}

export function createEmptyProcessedSurveys(): IProcessedSurveys {
  return {
    _id: "",
    _rev: "",
    surveyId: "",
    answers: {},
    type: "",
    email: "",
  };
}

export interface IProcessedSurveysSlice {
  processedSurveys: IProcessedSurveys[];
  answers: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

export function createEmptyProcessedSurveysSlice(): IProcessedSurveysSlice {
  return {
    answers: [],
    processedSurveys: [],
    status: "idle",
  };
}
