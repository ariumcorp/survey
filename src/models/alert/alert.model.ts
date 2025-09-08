import { Severity } from "utils/enums";
import { z } from "zod";

const alertItemSchema = z.object({
  id: z.string(),
  show: z.boolean().optional(),
  severity: z.nativeEnum(Severity),
  message: z.string(),
  duration: z.number().optional(),
});

export type AlertItemModel = z.infer<typeof alertItemSchema>;

export function createEmptyAlertModel(): AlertItemModel {
  return {
    id: "",
    show: false,
    severity: Severity.Info,
    message: "",
    duration: 0,
  };
}

const alertsSchema = z.object({
  queue: z.array(alertItemSchema),
});

export type AlertsSchema = z.infer<typeof alertsSchema>;

export function createEmptyAlerts(): AlertsSchema {
  return {
    queue: [],
  };
}
