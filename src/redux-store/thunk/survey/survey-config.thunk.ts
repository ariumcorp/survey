import { IUpdateConfigPayload } from "models";
import { surveyConfigSlice } from "redux-store/slices";
import { ReduxThunkAction } from "redux-store/store";

export const updateConfig =
  (arg: IUpdateConfigPayload): ReduxThunkAction =>
  (dispatch) => {
    dispatch(surveyConfigSlice.actions.updateConfig(arg));
  };
