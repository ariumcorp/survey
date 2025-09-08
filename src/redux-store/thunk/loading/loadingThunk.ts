import { loadingSlice } from "../../slices";
import { ReduxThunkAction } from "../../store";

export const hideLoading = (): ReduxThunkAction => (dispatch) => {
  dispatch(loadingSlice.actions.hideLoading());
};

export const openLoading =
  (value: string = "..."): ReduxThunkAction =>
  (dispatch) => {
    dispatch(loadingSlice.actions.openLoading({ open: true, message: value }));
  };
