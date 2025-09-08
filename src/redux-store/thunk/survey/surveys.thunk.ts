import { ISurveyBuilderState } from "models";
import { createAppAsyncThunk } from "redux-store/createAppAsyncThunk";
import { surveysSlice } from "redux-store/slices";
import { ReduxThunkAction } from "redux-store/store";
import { dbService } from "services";

export const fetchAllSurveys = createAppAsyncThunk(
  "surveys/fetchAll",
  async () => {
    const result = await dbService.getAllDocs();
    // Mapeamos para extraer solo los documentos
    const survyeTemp = result.rows.map(
      (row) => row.doc
    ) as ISurveyBuilderState[];
    return survyeTemp.filter((s) => s.type === "survey");
  }
);

export const addOrUpdateSurvey =
  (arg: ISurveyBuilderState): ReduxThunkAction =>
  (dispatch) => {
    console.log("addOrUpdateSurvey", arg);
    dispatch(surveysSlice.actions.addOrUpdateSurvey(arg));
  };

export const removeSurvey =
  (arg: { id: string }): ReduxThunkAction =>
  (dispatch) => {
    dispatch(surveysSlice.actions.removeSurvey(arg));
  };
