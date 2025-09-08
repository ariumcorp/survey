import { infoDeviceSlice } from "redux-store/slices";
import { ReduxThunkAction } from "redux-store/store";

export const updateValueIsMovil =
  (value: boolean): ReduxThunkAction =>
  (dispatch) => {
    dispatch(infoDeviceSlice.actions.updateValueIsMovil(value));
  };
