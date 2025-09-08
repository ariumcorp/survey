import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createEmptyISurveySlice, ISurveyBuilderState } from "models";
import { fetchAllSurveys } from "redux-store/thunk";
import { Slice } from "utils/enums";

export const surveysSlice = createSlice({
  name: Slice.SurveysSlice,
  initialState: createEmptyISurveySlice(),
  reducers: {
    // Acción para añadir o actualizar una encuesta en la lista
    addOrUpdateSurvey: (state, action: PayloadAction<ISurveyBuilderState>) => {
      const index = state.surveys.findIndex(
        (s) => s._id === action.payload._id
      );
      if (index !== -1) {
        // Si existe, la actualizamos
        state.surveys[index] = action.payload;
      } else {
        // Si no existe, la añadimos
        state.surveys.push(action.payload);
      }
    },
    // Acción para eliminar una encuesta de la lista
    removeSurvey: (state, action: PayloadAction<{ id: string }>) => {
      state.surveys = state.surveys.filter((s) => s._id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSurveys.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllSurveys.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.surveys = action.payload;
      })
      .addCase(fetchAllSurveys.rejected, (state) => {
        state.status = "failed";
      });
  },
});
