import { ISurveyBuilderState } from "./question.model";

export interface ISurveySlice {
  surveys: ISurveyBuilderState[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

export function createEmptyISurveySlice(): ISurveySlice {
  return {
    surveys: [],
    status: "idle",
  };
}
