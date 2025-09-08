import { themeSlice } from "../../slices";
import { ReduxThunkAction } from "../../store";

export const clearValueTheme = (): ReduxThunkAction => (dispatch) => {
  dispatch(themeSlice.actions.clearValueTheme());
};

export const changeTheme =
  (value: string): ReduxThunkAction =>
  (dispatch) => {
    dispatch(themeSlice.actions.changeTheme(value));
  };
