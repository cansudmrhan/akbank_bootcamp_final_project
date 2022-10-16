import service from "../../instance";
import {
  CreateCardRequestPayload,
  CreateCardResponseType,
  UpdateCardRequestPayload,
} from "./types";

export const create = (
  payload: CreateCardRequestPayload
): Promise<CreateCardResponseType> => service.post("card", payload);

export const list = () => service.get("card");

export const getById = (id: string) => service.get(`card/${id}`);

export const update = (id: number, payload: UpdateCardRequestPayload) =>
  service.put(`card/${id}`, payload);

export const destroy = (id: number) => service.delete(`card/${id}`);
