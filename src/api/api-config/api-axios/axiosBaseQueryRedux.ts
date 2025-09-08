import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from "axios";
import axiosInstance from "./axiosInstance";

export const axiosBaseQueryRedux =
  (
    {
      baseUrl,
    }: {
      baseUrl: string;
    } = {
      baseUrl: axiosInstance.defaults.baseURL
        ? axiosInstance.defaults.baseURL
        : "",
    }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const ulrTest = axiosInstance.defaults.baseURL;
      const result = await axiosInstance({
        url: ulrTest + url,
        method,
        data,
        params,
        //headers,
      });
      return { data: result };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
