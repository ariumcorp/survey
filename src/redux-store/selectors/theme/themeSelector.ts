import type { ReduxState } from "../../store";

export const themeSelector = (state: ReduxState) => state.themeSlice;
