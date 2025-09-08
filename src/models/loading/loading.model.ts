import { z } from "zod";

const loadingSchema = z.object({
  open: z.boolean(),
  message: z.string(),
});

export type LoadingModel = z.infer<typeof loadingSchema>;

export function createEmptyLoadingModel(): LoadingModel {
  return {
    open: false,
    message: "...",
  };
}
