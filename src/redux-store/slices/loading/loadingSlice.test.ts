import { createEmptyLoadingModel, LoadingModel } from "../../../models";
import { loadingSlice } from "./loadingSlice";

const { reducer, actions } = loadingSlice;

describe("Loading Slice", () => {
  it("Debería devolver el estado inicial", () => {
    const initialState = createEmptyLoadingModel();
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("Debería abrir el loading,", () => {
    const loading: LoadingModel = {
      open: true,
      message: "Test loading",
    };

    const newState = reducer(
      createEmptyLoadingModel(),
      actions.openLoading(loading)
    );
    expect(newState).toEqual(loading);
  });

  it("Debería cerrar el loading", () => {
    const prevState: LoadingModel = {
      open: true,
      message: "Test loading",
    };

    const newState = reducer(prevState, actions.hideLoading());
    expect(newState).toEqual(createEmptyLoadingModel());
  });

  it("No debe mutar el objeto de estado original", () => {
    const prevState = createEmptyLoadingModel();
    const clone = { ...prevState };
    const newValue: LoadingModel = {
      open: true,
      message: "Test loading",
    };

    reducer(prevState, actions.openLoading(newValue));
    expect(prevState).toEqual(clone);
  });
});
