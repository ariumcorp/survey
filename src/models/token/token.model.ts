import { z } from "zod";

export const tokenSchema = z.object({
  accessToken: z.string(),
  message: z.string(),
  refreshToken: z.string(),
});

export type TokenModel = z.infer<typeof tokenSchema>;

export function createEmptyTokenModel(): TokenModel {
  return {
    accessToken: "",
    message: "",
    refreshToken: "",
  };
}
