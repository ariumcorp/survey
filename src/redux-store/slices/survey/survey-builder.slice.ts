import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createEmptySurveyBuilderState,
  ISurveyBuilderState,
  ISurveyQuestion,
} from "models";
import { Slice } from "utils/enums";
import { createDefaultQuestion } from "utils/utils";

export const surveyBuilderSlice = createSlice({
  name: Slice.SurveyBuilderSlice,
  initialState: createEmptySurveyBuilderState(),
  reducers: {
    clean: (state) => {
      return { ...state, ...createEmptySurveyBuilderState() };
    },
    updateSurveyMeta: (
      state,
      action: PayloadAction<{ key: "title" | "description"; value: string }>
    ) => {
      state[action.payload.key] = action.payload.value;
    },
    addQuestion: (state, action: PayloadAction<{ type: string }>) => {
      state.elements.push(createDefaultQuestion(action.payload.type));
    },
    removeQuestion: (state, action: PayloadAction<{ index: number }>) => {
      state.elements.splice(action.payload.index, 1);
    },
    updateQuestion: (
      state,
      action: PayloadAction<{ index: number; updatedQuestion: ISurveyQuestion }>
    ) => {
      state.elements[action.payload.index] = action.payload.updatedQuestion;
    },
    // Para cargar un JSON existente en el constructor
    loadSurveyJson: (state, action: PayloadAction<ISurveyBuilderState>) => {
      return action.payload;
    },

    setUpdateSurveyMeta: (
      _state,
      action: PayloadAction<ISurveyBuilderState>
    ) => {
      return action.payload;
    },
  },
});
