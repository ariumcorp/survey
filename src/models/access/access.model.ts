import { AccessType } from "utils/enums";
import { z } from "zod";

export const accessSchema = z.object({
  id: z.number(),
  applicationId: z.number(),
  applicationCode: z.string(),
  resourceTypeId: z.number(),
  resourceTypeCode: z.nativeEnum(AccessType),
  code: z.string(),
  parentId: z.number().nullable(),
  parentCode: z.string().nullable(),
  name: z.string(),
  description: z.string(),
  path: z.string(),
  icon: z.string(),
  order: z.number(),
  createdDatetime: z.string().datetime(),
  createdBy: z.string(),
  updatedDatetime: z.string().datetime(),
  updatedBy: z.string(),
  pathsParent: z.array(z.string()),
  pathComplete: z.string(),
});

export type AccessModel = z.infer<typeof accessSchema> & {
  children: AccessModel[];
};

export function createEmptyAccessModel(): AccessModel {
  return {
    id: 0,
    applicationId: 0,
    applicationCode: "",
    resourceTypeCode: AccessType.Menu,
    resourceTypeId: 0,
    code: "",
    parentId: 0,
    parentCode: "",
    name: "",
    description: "",
    path: "",
    icon: "",
    order: 0,
    createdDatetime: "",
    createdBy: "",
    updatedDatetime: "",
    updatedBy: "",
    children: [],
    pathsParent: [],
    pathComplete: "",
  };
}
