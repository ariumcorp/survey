import { Orientation } from "utils/enums";
import { z } from "zod";

export const infoDeviceReduxSchema = z.object({
  isMovil: z.boolean(),
  orientation: z.nativeEnum(Orientation),
  isVertical: z.boolean(),
  isHorizontal: z.boolean(),
});

export type InfoDeviceModel = z.infer<typeof infoDeviceReduxSchema>;

export function createEmptyInfoDeviceModel(): InfoDeviceModel {
  return {
    isMovil: false,
    orientation: Orientation.Horizontal,
    isVertical: false,
    isHorizontal: true,
  };
}
