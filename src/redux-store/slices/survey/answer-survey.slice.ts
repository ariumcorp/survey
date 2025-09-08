import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createEmptyAnswerSurvey, IAnswerSurvey } from "models";
import { Slice } from "utils/enums";

export const answerSurveySlice = createSlice({
  name: Slice.AnswerSurveySlice,
  initialState: createEmptyAnswerSurvey(),
  reducers: {
    cleanAnswerSurvey: (state) => {
      return { ...state, ...createEmptyAnswerSurvey() };
    },

    setAnswerSurveyMeta: (state, action: PayloadAction<IAnswerSurvey>) => {
      return action.payload;
    },
  },
});
