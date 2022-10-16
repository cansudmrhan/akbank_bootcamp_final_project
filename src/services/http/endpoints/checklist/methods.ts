import service from "../../instance";
import {
  CreateChecklistRequestPayload,
  CreateChecklistResponseType,

} from "./types";

export const create = (
  payload: CreateChecklistRequestPayload
): Promise<CreateChecklistResponseType> => service.post("checklist", payload);

export const destroy = (id: number) => service.delete(`checklist/${id}`);

