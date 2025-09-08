import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createEmptySurveyConfigState,
  IUpdateConfigPayload,
  ISurveyConfigState,
} from "models";
import { Slice } from "utils/enums";

export const surveyConfigSlice = createSlice({
  name: Slice.SurveyConfigSlice,
  initialState: createEmptySurveyConfigState(),
  reducers: {
    updateConfig: (state, action: PayloadAction<IUpdateConfigPayload>) => {
      const { key, value } = action.payload;
      // Esto asegura que solo se puedan actualizar claves que existen en el estado
      if (key in state) {
        (state[key] as any) = value;
      }
    },
    setConfig: (state, action: PayloadAction<Partial<ISurveyConfigState>>) => {
      return { ...state, ...action.payload };
    },
  },
});
