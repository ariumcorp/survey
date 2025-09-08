import type { ReduxState } from "../../store";

export const loadingSelector = (state: ReduxState) => state.loadingSlice;
