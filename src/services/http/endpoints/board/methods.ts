import service from "../../instance";
import { CreateBoardRequestPayload, CreateBoardResponseType } from "./types";

export const create = (
  payload: CreateBoardRequestPayload
): Promise<CreateBoardResponseType> => service.post("board", payload);

export const list = () => service.get("board");

export const update = (id: number, payload: CreateBoardRequestPayload) =>
  service.put(`board/${id}`, payload);
