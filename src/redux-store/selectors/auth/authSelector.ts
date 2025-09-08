import type { ReduxState } from "../../store";

export const authSelector = (state: ReduxState) => state.authSlice;
