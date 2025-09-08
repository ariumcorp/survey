import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createEmptyProcessedSurveysSlice, IProcessedSurveys } from "models";
import { fetchAllProcessedSurveys } from "redux-store/thunk";
import { Slice } from "utils/enums";

export const processedSurveysSlice = createSlice({
  name: Slice.ProcessedSurveysSlice,
  initialState: createEmptyProcessedSurveysSlice(),
  reducers: {
    cleanProcessedSurveys: (state) => {
      return { ...state, ...createEmptyProcessedSurveysSlice() };
    },
    // Acción para añadir o actualizar una encuesta en la lista
    addOrUpdateProcessedSurveys: (
      state,
      action: PayloadAction<IProcessedSurveys>
    ) => {
      const index = state.processedSurveys.findIndex(
        (s) => s._id === action.payload._id
      );
      if (index !== -1) {
        // Si existe, la actualizamos
        state.processedSurveys[index] = action.payload;
      } else {
        // Si no existe, la añadimos
        state.processedSurveys.push(action.payload);
      }
      const answers: any[] = [];

      for (const survey of state.processedSurveys) {
        answers.push(survey.answers);
      }
      state.answers = answers;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProcessedSurveys.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProcessedSurveys.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.processedSurveys = action.payload.processedSurveys;
        state.answers = action.payload.answers;
      })
      .addCase(fetchAllProcessedSurveys.rejected, (state) => {
        state.status = "failed";
      });
  },
});
