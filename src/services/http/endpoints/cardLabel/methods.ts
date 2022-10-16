import service from "../../instance";
import {
  CreateCardLabelRequestPayload,
  CreateCardLabelResponseType,
} from "./types";

export const create = (
  payload: CreateCardLabelRequestPayload
): Promise<CreateCardLabelResponseType> => service.post("card-label", payload);

export const destroy = (id: number) => service.delete(`card-label/${id}`);
