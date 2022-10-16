import service from "../../instance";
import {
  CreateBoardRequestPayload,
  CreateBoardResponseType,
  UpdateBoardRequestPayload,
} from "./types";

export const create = (
  payload: CreateBoardRequestPayload
): Promise<CreateBoardResponseType> => service.post("board", payload);

export const list = () => service.get("board");

export const getById = (id: string) => service.get(`board/${id}`);

export const update = (id: number, payload: UpdateBoardRequestPayload) =>
  service.put(`board/${id}`, payload);

export const destroy = (id: number) => service.delete(`board/${id}`);

export const getLabels = () => service.get("label");
