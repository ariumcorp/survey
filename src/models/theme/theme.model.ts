import { z } from "zod";

const themeSchema = z.object({
  codeTheme: z.string(),
});

export type ThemeModel = z.infer<typeof themeSchema>;

export function createEmptyThemeModel(): ThemeModel {
  return {
    codeTheme: "system",
  };
}
