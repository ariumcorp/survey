import { setInvalidToken } from "../../../redux-store/thunk";
//import { getBaseUrl } from "services";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { AxiosHeaders } from "axios";
import { ReduxStore } from "redux-store/store";

const identityServerEndpoint = ""; //getBaseUrl();
const httpOption = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};
const axiosInstance = axios.create({
  baseURL: identityServerEndpoint,
  headers: httpOption,
});

let isRefreshing = false;
let pendingRequests: Array<(token: string) => void> = [];

function retryWithToken(originalConfig: AxiosRequestConfig, token: string) {
  originalConfig.headers = {
    ...(originalConfig.headers ?? {}),
    Authorization: `Bearer ${token}`,
  };
  return axiosInstance(originalConfig);
}

export function attachInterceptors(store: ReduxStore) {
  // REQUEST: añade Authorization desde el state
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const { authSlice } = store.getState();
      const accessToken = authSlice.token.accessToken;
      if (accessToken) {
        // Asegura que headers sea una instancia de AxiosHeaders
        if (!config.headers) {
          config.headers = new AxiosHeaders();
        } else if (!(config.headers as any).set) {
          // Si vino como objeto plano, lo envolvemos
          config.headers = new AxiosHeaders(config.headers);
        }
        config.headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return config;
    }
  );

  // RESPONSE: maneja 401 con refresh + cola
  axiosInstance.interceptors.response.use(
    (res) => res.data,
    async (error: AxiosError<any>) => {
      console.log("AxiosError", error.response?.data);
      const originalConfig = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };
      const status = error.response?.status;
      const { hasLoggedIn } = store.getState().authSlice;

      // Si no es 401, rechaza normal
      if (status !== 401) {
        return Promise.reject(error);
      }

      // Evita bucle: si ya reintentamos esta request, logout
      if (originalConfig._retry) {
        if (hasLoggedIn) store.dispatch(setInvalidToken());

        return Promise.reject(error);
      }

      // Marcar para prevenir bucles
      originalConfig._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;

          // Lanza el refresh token usando Redux Toolkit
          //const resultAction = await store.dispatch(refreshTokenThunk());
          // Si el thunk fue exitoso, unwrap para obtener el token nuevo
          const newToken = ""; //(resultAction as any).payload?.accessToken;

          // Libera la cola con el token nuevo
          pendingRequests.forEach((cb) => cb(newToken));
          pendingRequests = [];

          // Reintenta esta request
          return retryWithToken(originalConfig, newToken);
        }

        // Si ya hay un refresh en curso, encola esta request hasta tener token
        return new Promise((resolve, reject) => {
          pendingRequests.push((token: string) => {
            retryWithToken(originalConfig, token).then(resolve).catch(reject);
          });
        });
      } catch (e) {
        // Refresh falló → cerrar sesión
        pendingRequests = [];
        if (hasLoggedIn) store.dispatch(setInvalidToken());

        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }
  );
}

export default axiosInstance;
