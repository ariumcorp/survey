import { AnyAction, Reducer } from "@reduxjs/toolkit";
import {
  createEmptyAlerts,
  createEmptyAuthModel,
  createEmptyInfoDeviceModel,
  createEmptyLoadingModel,
  createEmptySurveyBuilderState,
  createEmptySurveyConfigState,
  createEmptyThemeModel,
  createEmptyISurveySlice,
  createEmptyAnswerSurvey,
  createEmptyProcessedSurveysSlice,
} from "models";
import { resetApp } from "./appActions";
import {
  alertSlice,
  authSlice,
  infoDeviceSlice,
  loadingSlice,
  themeSlice,
  surveyConfigSlice,
  surveyBuilderSlice,
  surveysSlice,
  answerSurveySlice,
  processedSurveysSlice,
} from "./slices";

const makeResettable =
  <S>(reducer: Reducer<S>, initial: S) =>
  (state: S | undefined, action: AnyAction): S => {
    if (resetApp.match(action)) return initial;
    return reducer(state, action);
  };

export const reducer = {
  themeSlice: makeResettable(themeSlice.reducer, createEmptyThemeModel()),
  authSlice: makeResettable(authSlice.reducer, createEmptyAuthModel()),
  alertSlice: makeResettable(alertSlice.reducer, createEmptyAlerts()),
  loadingSlice: makeResettable(loadingSlice.reducer, createEmptyLoadingModel()),
  infoDeviceSlice: makeResettable(
    infoDeviceSlice.reducer,
    createEmptyInfoDeviceModel()
  ),
  surveyConfigSlice: makeResettable(
    surveyConfigSlice.reducer,
    createEmptySurveyConfigState()
  ),
  surveyBuilderSlice: makeResettable(
    surveyBuilderSlice.reducer,
    createEmptySurveyBuilderState()
  ),
  surveysSlice: makeResettable(surveysSlice.reducer, createEmptyISurveySlice()),
  answerSurveySlice: makeResettable(
    answerSurveySlice.reducer,
    createEmptyAnswerSurvey()
  ),
  processedSurveysSlice: makeResettable(
    processedSurveysSlice.reducer,
    createEmptyProcessedSurveysSlice()
  ),
  // [testApi.reducerPath]: testApi.reducer,
};
