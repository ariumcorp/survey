import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createEmptyThemeModel } from "../../../models";
import { Slice } from "../../../utils/enums";

export const themeSlice = createSlice({
  name: Slice.Theme,
  initialState: createEmptyThemeModel(),
  reducers: {
    clearValueTheme: (state) => {
      return { ...state, ...createEmptyThemeModel() };
    },
    changeTheme: (state, action: PayloadAction<string>) => {
      state.codeTheme = action.payload;
    },
  },
});
