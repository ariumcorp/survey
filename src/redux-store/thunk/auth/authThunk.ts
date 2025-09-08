import { authSlice } from "../../slices";
import { ReduxThunkAction } from "../../store";

export const signIn =
  (arg: { email: string; password: string }): ReduxThunkAction =>
  (dispatch) => {
    dispatch(authSlice.actions.signIn(arg));
  };

export const logout = (): ReduxThunkAction => (dispatch) => {
  dispatch(authSlice.actions.cleanValuesAuth());
};

export const setInvalidToken = (): ReduxThunkAction => (dispatch) => {
  dispatch(authSlice.actions.setInvalidToken());
};
