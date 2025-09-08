import { Capacitor } from "@capacitor/core";
import { urlModel } from "models";
// import { ICompany } from "../../models";

export const runningOnWeb = (): boolean => {
  return Capacitor.getPlatform() === "web";
};

export const getBaseUrl = (): string => {
  return process.env.REACT_APP_USE_API_INTERNAL!.toLowerCase() === "true"
    ? process.env.REACT_APP_IDENTITY_API_INTERNAL!
    : process.env.REACT_APP_IDENTITY_API!;
};

export const getEndpointUrl = (url: urlModel): string => {
  return process.env.REACT_APP_USE_API_INTERNAL!.toLowerCase() === "true"
    ? url.urlInternal //company.ediEndpointUrlInternal
    : url.url; //company.ediEndpointUrl;
};
