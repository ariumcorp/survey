import { urlModel } from "models";

import { UrlType } from "../../utils/enums";
import { getBaseUrl, getEndpointUrl } from "../env/envService";
import axiosInstance from "api/api-config/api-axios/axiosInstance";

export const updateUrl = (
  urlType: string
  // auth: IAuthModel
) => {
  switch (urlType) {
    case UrlType.AdminCenter:
      // axiosInstance.defaults.baseURL = getEndpointUrl();
      break;
    case UrlType.Identity:
      axiosInstance.defaults.baseURL = getBaseUrl();
      axiosInstance.defaults.headers.common = {};
      axiosInstance.defaults.headers.common = {
        // "Content-Type": "application/x-www-form-urlencoded",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        // Authorization: `Baerer ${token}`,
      };
      break;
  }
};

export const updateEndpointUrl = (url: urlModel) => {
  axiosInstance.defaults.baseURL = getEndpointUrl(url);
};

export const resetBaseUrl = () => {
  axiosInstance.defaults.baseURL = getBaseUrl();
  axiosInstance.defaults.headers.common = {};
  axiosInstance.defaults.headers.common = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
};

export const updateHeaders = (accessToken: string) => {
  axiosInstance.defaults.headers.common = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${accessToken}`,
  };
};
