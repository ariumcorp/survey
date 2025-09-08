import { IProcessedSurveys } from "models";
import { createAppAsyncThunk } from "redux-store/createAppAsyncThunk";
import { processedSurveysSlice } from "redux-store/slices";
import { ReduxThunkAction } from "redux-store/store";
import { dbService } from "services";

export const fetchAllProcessedSurveys = createAppAsyncThunk(
  "surveys/fetchAllProcessedSurveys",
  async () => {
    const result = await dbService.getAllDocs();
    const processedSurveysTemp = result.rows.map(
      (row) => row.doc
    ) as IProcessedSurveys[];
    const processedSurveys = processedSurveysTemp.filter(
      (s) => s.type === "answer"
    );

    const answers: any[] = [];

    for (const survey of processedSurveys) {
      answers.push(survey.answers);
    }

    return { processedSurveys, answers };
  }
);

export const addOrUpdateProcessedSurveys =
  (arg: IProcessedSurveys): ReduxThunkAction =>
  (dispatch) => {
    console.log("addOrUpdateProcessedSurveys", arg);
    dispatch(processedSurveysSlice.actions.addOrUpdateProcessedSurveys(arg));
  };
