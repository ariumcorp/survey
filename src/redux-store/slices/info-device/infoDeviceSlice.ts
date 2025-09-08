import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createEmptyInfoDeviceModel } from "models";
import { Orientation, Slice } from "utils/enums";

export const infoDeviceSlice = createSlice({
  name: Slice.InfoDeviceSlice,
  initialState: createEmptyInfoDeviceModel(),
  reducers: {
    updateValueIsMovil: (state, action: PayloadAction<boolean>) => {
      state.isMovil = action.payload;
      state.orientation = state.isMovil
        ? Orientation.Vertical
        : Orientation.Horizontal;
      state.isVertical = state.isMovil;
      state.isHorizontal = !state.isMovil;
    },
  },
});
