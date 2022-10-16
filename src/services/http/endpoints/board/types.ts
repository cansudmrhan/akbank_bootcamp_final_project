import { Board } from "../../../../contexts/BoardContext/types";

export type CreateBoardRequestPayload = {
  title: string;
};

export type CreateBoardResponseType = {
  data: Board;
};

export type UpdateBoardRequestPayload = CreateBoardRequestPayload & {
  title:string;
  members?: number[];
};
