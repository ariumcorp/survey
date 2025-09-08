import type { ReduxState } from "../../store";

export const alertSelector = (state: ReduxState) => state.alertSlice;
