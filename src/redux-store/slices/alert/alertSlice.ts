import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertItemModel, createEmptyAlerts } from "../../../models";
import { Slice } from "../../../utils/enums";

export const alertSlice = createSlice({
  name: Slice.Alert,
  initialState: createEmptyAlerts(),
  reducers: {
    // hideAlert: (state) => {
    //   return { ...state, ...createEmptyAlerts() };
    // },
    // showAlert: (state, action: PayloadAction<AlertItemModel>) => {
    //   return { ...state, ...action.payload };
    // },
    showAlert: {
      prepare: (payload: Omit<AlertItemModel, "id">) => ({
        payload: { ...payload, id: crypto.randomUUID() },
      }),
      reducer: (state, action: PayloadAction<AlertItemModel>) => {
        state.queue.push(action.payload);
      },
    },
    showAlerts: (
      state,
      action: PayloadAction<Omit<AlertItemModel, "id">[]>
    ) => {
      for (const a of action.payload) {
        state.queue.push({ ...a, id: crypto.randomUUID() });
      }
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.queue = state.queue.filter((a) => a.id !== action.payload);
    },
    clearAlerts: (state) => {
      state.queue = [];
    },
  },
});
