import { IAnswerSurvey } from "models";
import { answerSurveySlice } from "redux-store/slices";
import { ReduxThunkAction } from "redux-store/store";

export const cleanAnswerSurvey = (): ReduxThunkAction => (dispatch) => {
  dispatch(answerSurveySlice.actions.cleanAnswerSurvey());
};

export const setAnswerSurveyMeta =
  (arg: IAnswerSurvey): ReduxThunkAction =>
  (dispatch) => {
    console.log("setAnswerSurveyMeta", arg);
    dispatch(answerSurveySlice.actions.setAnswerSurveyMeta(arg));
  };
