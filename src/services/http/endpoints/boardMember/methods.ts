import service from "../../instance";
import {
  CreateBoardMemberRequestPayload,
  CreateBoardMemberResponseType,
  UpdateBoardMemberRequestPayload,
} from "./types";

export const create = (
  payload: CreateBoardMemberRequestPayload
): Promise<CreateBoardMemberResponseType> =>
  service.post("board-member", payload);

export const update = (
  id: number,
  payload: UpdateBoardMemberRequestPayload
): Promise<UpdateBoardMemberRequestPayload> =>
  service.put(`board-member/${id}`, payload);

export const destroy = (id: number) => service.delete(`board-member/${id}`);
