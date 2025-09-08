import axios from "axios";
import { useCallback, useMemo } from "react";
import { alertSlice } from "redux-store/slices";
import { useDispatch } from "redux-store/store";
import { Severity } from "./enums";
import { equalsClean } from "./utils";

export type ApiErrorPayload = {
  errors: Array<{ code: string; params?: Record<string, unknown> }>;
};

type TFn = (key: string, params?: Record<string, any>) => string;

export type MsgInput =
  | string
  | {
      key: string;
      params?: Record<string, any>;
      defaultValue?: string; // ✅ opcional
      raw?: boolean; // si true, no traduce (usa key como texto)
    };

const hasMessage = (x: unknown): x is { message: string } =>
  typeof x === "object" &&
  x !== null &&
  "message" in x &&
  typeof (x as any).message === "string";

const isApiErrorPayload = (x: unknown): x is ApiErrorPayload =>
  typeof x === "object" &&
  x !== null &&
  "errors" in x &&
  Array.isArray((x as any).errors);

export function useNotifier(t?: TFn) {
  const dispatch = useDispatch();

  const translate = useCallback(
    (k: string, p?: Record<string, any>) => (t ? t(k, p) : k),
    [t]
  );

  const renderMsg = useCallback(
    (m: MsgInput): string => {
      // string => lo tratamos como key
      if (typeof m === "string") return translate(m);
      // texto crudo sin traducir
      if (m.raw) return m.key;

      const params = m.defaultValue
        ? { ...m.params, defaultValue: m.defaultValue }
        : m.params;
      const out = translate(m.key, params);

      // Si parece que no se encontró traducción y se dio defaultValue, úsalo.
      // (Tolgee suele devolver la key cuando falta)
      if (equalsClean(out, m.key) && m.defaultValue?.length)
        return m.defaultValue;

      return out;
    },
    [translate]
  );

  const notify = useCallback(
    (severity: Severity, messages: MsgInput | MsgInput[]) => {
      const list = Array.isArray(messages) ? messages : [messages];
      const translated = list.map(renderMsg).filter(Boolean) as string[];
      const unique = Array.from(new Set(translated));
      if (!unique.length) return;

      dispatch(
        alertSlice.actions.showAlerts(
          unique.map((message) => ({ message, severity }))
        )
      );
    },
    [dispatch, renderMsg]
  );

  const success = useCallback(
    (m: MsgInput | MsgInput[]) => notify(Severity.Success, m),
    [notify]
  );
  const info = useCallback(
    (m: MsgInput | MsgInput[]) => notify(Severity.Info, m),
    [notify]
  );
  const warn = useCallback(
    (m: MsgInput | MsgInput[]) => notify(Severity.Warning, m),
    [notify]
  );
  const error = useCallback(
    (m: MsgInput | MsgInput[]) => notify(Severity.Error, m),
    [notify]
  );

  const errorFromApi = useMemo(() => {
    return (
      err: unknown,
      fallback = "errors.unexpected",
      fallbackDefault?: string
    ) => {
      // 1) Tu payload propio
      if (isApiErrorPayload(err)) {
        const msgs = err.errors.map((e) => translate(e.code, e.params));
        return error(
          msgs.length
            ? msgs
            : [{ key: fallback, defaultValue: fallbackDefault }]
        );
      }
      // 2) AxiosError
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as any;
        if (data?.errors && Array.isArray(data.errors)) {
          const msgs = data.errors.map((e: any) =>
            translate(e.code ?? e.message ?? fallback, e.params)
          );
          return error(
            msgs.length
              ? msgs
              : [{ key: fallback, defaultValue: fallbackDefault }]
          );
        }
        if (typeof data?.message === "string")
          return error({ key: data.message, defaultValue: fallbackDefault });
        if (hasMessage(err))
          return error({ key: err.message, defaultValue: fallbackDefault });
        return error({ key: fallback, defaultValue: fallbackDefault });
      }
      // 3) String plano
      if (typeof err === "string")
        return error({ key: err, defaultValue: fallbackDefault });
      // 4) Objeto con message
      if (hasMessage(err))
        return error({ key: err.message, defaultValue: fallbackDefault });
      // 5) Fallback
      return error({ key: fallback, defaultValue: fallbackDefault });
    };
  }, [translate, error]);

  return { notify, success, info, warn, error, errorFromApi };
}
