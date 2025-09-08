import { ISurveyBuilderState, ISurveyQuestion } from "models";
import { surveyBuilderSlice } from "redux-store/slices";
import { ReduxThunkAction } from "redux-store/store";

export const updateSurveyMeta =
  (arg: { key: "title" | "description"; value: string }): ReduxThunkAction =>
  (dispatch) => {
    dispatch(surveyBuilderSlice.actions.updateSurveyMeta(arg));
  };

export const addQuestion =
  (arg: { type: string }): ReduxThunkAction =>
  (dispatch) => {
    dispatch(surveyBuilderSlice.actions.addQuestion(arg));
  };

export const removeQuestion =
  (arg: { index: number }): ReduxThunkAction =>
  (dispatch) => {
    dispatch(surveyBuilderSlice.actions.removeQuestion(arg));
  };

export const updateQuestion =
  (arg: {
    index: number;
    updatedQuestion: ISurveyQuestion;
  }): ReduxThunkAction =>
  (dispatch) => {
    dispatch(surveyBuilderSlice.actions.updateQuestion(arg));
  };

export const loadSurveyJson =
  (arg: ISurveyBuilderState): ReduxThunkAction =>
  (dispatch) => {
    dispatch(surveyBuilderSlice.actions.loadSurveyJson(arg));
  };

export const cleanSurveyBuilder = (): ReduxThunkAction => (dispatch) => {
  dispatch(surveyBuilderSlice.actions.clean());
};

export const setUpdateSurveyMeta =
  (arg: ISurveyBuilderState): ReduxThunkAction =>
  (dispatch) => {
    console.log("setUpdateSurveyMeta", arg);
    dispatch(surveyBuilderSlice.actions.setUpdateSurveyMeta(arg));
  };
