import { AxiosError } from "axios";

export type ApiErrorPayload = {
  success?: boolean;
  errors: { code: string; index: number }[]; //Record<string, string[]>;
  resource?: any;
};

export function parseAxiosError(err: unknown): ApiErrorPayload {
  if (isAxiosError(err)) {
    const data = err.response?.data as any;
    // Intenta mapear al shape de tu API
    if (data && typeof data === "object") {
      return {
        success: false,
        errors: data.errors ?? [
          { code: "msg_error_unexpected_error", index: 0 },
        ],
        resource: data.resource,
      };
    }
    return {
      errors: [{ code: "msg_error_network_error", index: 0 }],
    };
  }
  return { errors: [{ code: "msg_error_unexpected_error", index: 0 }] };
}

export function isAxiosError<T = any>(err: unknown): err is AxiosError<T> {
  return !!(err as any)?.isAxiosError;
}
