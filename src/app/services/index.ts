import { departmentsService } from "@/app/services/departments";
import { documentsService } from "@/app/services/documents";
import { ownersService } from "@/app/services/owners";
import { processesService } from "@/app/services/processes";
import { toolsService } from "@/app/services/tools";

import { NODE_TYPES } from "@/lib/consts";

export function getServiceByType(type: string) {
  let service;

  if (type === NODE_TYPES.DEPARTMENT) service = departmentsService;
  else if (type === NODE_TYPES.DOCUMENT) service = documentsService;
  else if (type === NODE_TYPES.OWNER) service = ownersService;
  else if (type === NODE_TYPES.PROCESS) service = processesService;
  else service = toolsService;

  return service;
}
