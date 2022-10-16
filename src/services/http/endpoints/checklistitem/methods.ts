import service from "../../instance";
import {
  CreateChecklistitemRequestPayload,
  CreateChecklistitemResponseType,
  UpdateChecklistitemRequestPayload,
} from "./types";

export const create = (
  payload: CreateChecklistitemRequestPayload
): Promise<CreateChecklistitemResponseType> =>
  service.post("checklist-item", payload);

export const update = (
  id: number,
  payload: UpdateChecklistitemRequestPayload
): Promise<UpdateChecklistitemRequestPayload> =>
  service.put(`checklist-item/${id}`, payload);

export const destroy = (id: number) => service.delete(`checklist-item/${id}`);
