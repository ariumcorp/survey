import { loadingSlice } from "../../slices";
import { hideLoading, openLoading } from "./loadingThunk";

const { actions } = loadingSlice;

describe("Loading Thunk", () => {
  it("Debería cerrar el loading", () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    hideLoading()(dispatch, getState, undefined);
    expect(dispatch).toHaveBeenCalledWith(actions.hideLoading());
  });

  it("Debería mostrar el loading con el mensaje predeterminado", () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    openLoading()(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      actions.openLoading({
        open: true,
        message: "...",
      })
    );
  });

  it("Debería mostrar el loading con el mensaje enviado", () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    const message = "Cargando...";

    openLoading(message)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      actions.openLoading({
        open: true,
        message,
      })
    );
  });
});
