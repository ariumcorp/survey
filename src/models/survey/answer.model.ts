import {
  createEmptySurveyBuilderState,
  ISurveyBuilderState,
} from "./question.model";

export interface IAnswerSurvey extends ISurveyBuilderState {}

export function createEmptyAnswerSurvey(): IAnswerSurvey {
  return {
    ...createEmptySurveyBuilderState(),
  };
}
