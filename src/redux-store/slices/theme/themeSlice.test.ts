import { themeSlice } from "./themeSlice";
import { createEmptyThemeModel, ThemeModel } from "../../../models";

const { reducer, actions } = themeSlice;

describe("Theme-Slice", () => {
  it("Debería devolver el estado inicial", () => {
    const initialState = createEmptyThemeModel();
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("Debería cambiar el tema con setCodeTheme", () => {
    const initialState: ThemeModel = { codeTheme: "light" };
    const nextState = reducer(initialState, actions.changeTheme("dark"));
    expect(nextState.codeTheme).toBe("dark");
  });

  it("Debería limpiar el estado con clearValue", () => {
    const prevState: ThemeModel = {
      codeTheme: "dark",
    };

    const newState = reducer(prevState, actions.clearValueTheme());
    expect(newState).toEqual(createEmptyThemeModel());
  });

  it("No debe mutar el objeto de estado original", () => {
    const prevState = createEmptyThemeModel();
    const clone = { ...prevState };

    reducer(prevState, actions.changeTheme("dark"));
    expect(prevState).toEqual(clone);
  });
});
