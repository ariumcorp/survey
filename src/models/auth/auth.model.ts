import { z } from "zod";
import { tokenSchema, createEmptyTokenModel } from "../token/token.model";

const authSchema = z.object({
  email: z.string(),
  password: z.string(),
  loading: z.boolean(),
  token: tokenSchema,
  hasLoggedIn: z.boolean(),
  isCompletedSetToken: z.boolean(),
  tokenIsValid: z.boolean(),
});

export type AuthModel = z.infer<typeof authSchema>;

export function createEmptyAuthModel(): AuthModel {
  return {
    email: "",
    password: "",
    loading: false,
    token: createEmptyTokenModel(),
    hasLoggedIn: false,
    isCompletedSetToken: false,
    tokenIsValid: false,
  };
}
