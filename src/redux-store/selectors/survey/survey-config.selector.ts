import type { ReduxState } from "../../store";

export const surveyConfigSelector = (state: ReduxState) =>
  state.surveyConfigSlice;
export const surveyBuilderSelector = (state: ReduxState) =>
  state.surveyBuilderSlice;
export const surveysSelector = (state: ReduxState) => state.surveysSlice;
export const answerSurveySelector = (state: ReduxState) =>
  state.answerSurveySlice;
export const processedSurveysSelector = (state: ReduxState) =>
  state.processedSurveysSlice;
