import { z } from "zod";

export const urlSchema = z.object({
  urlType: z.string(),
  url: z.string(),
  urlInternal: z.string(),
});

export type urlModel = z.infer<typeof urlSchema>;

export function createEmptyUrl(): urlModel {
  return {
    urlType: "",
    url: "",
    urlInternal: "",
  };
}
