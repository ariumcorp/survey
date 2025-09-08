import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Slice } from "../../../utils/enums";

import { createEmptyAuthModel } from "models";

export const authSlice = createSlice({
  name: Slice.Auth,
  initialState: createEmptyAuthModel(),
  reducers: {
    signIn: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.hasLoggedIn = true;
    },
    cleanValuesAuth: (state) => {
      return { ...state, ...createEmptyAuthModel() };
    },
    setInvalidToken: (state) => {
      state.tokenIsValid = false;
    },
  },
});
