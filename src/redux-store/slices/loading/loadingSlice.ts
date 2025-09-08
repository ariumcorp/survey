import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createEmptyLoadingModel, LoadingModel } from "../../../models";
import { Slice } from "../../../utils/enums";

export const loadingSlice = createSlice({
  name: Slice.Loading,
  initialState: createEmptyLoadingModel(),
  reducers: {
    hideLoading: (state) => {
      return { ...state, ...createEmptyLoadingModel() };
    },
    openLoading: (state, action: PayloadAction<LoadingModel>) => {
      return { ...state, ...action.payload };
    },
  },
});
