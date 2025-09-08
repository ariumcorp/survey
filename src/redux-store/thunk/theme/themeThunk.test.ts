import { themeSlice } from "../../slices";
import { changeTheme, clearValueTheme } from "./themeThunk";

const { actions } = themeSlice;

describe("Theme Thunk", () => {
  it("Debería limpiar todo el estado de Theme", () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    clearValueTheme()(dispatch, getState, undefined);
    expect(dispatch).toHaveBeenCalledWith(actions.clearValueTheme());
  });

  it("Debería cambiar el Theme", () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    const value = "dark";

    changeTheme(value)(dispatch, getState, undefined);
    expect(dispatch).toHaveBeenCalledWith(actions.changeTheme(value));
  });
});
