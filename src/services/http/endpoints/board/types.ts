import { List, User } from "../../../../contexts/BoardContext/types";

export type CreateBoardRequestPayload = {
  title: string;
};

export type CreateBoardResponseType = {
  data: {
    id: number;
    title: string;
    owner: User;
    ownerId: number;
    members: User[];
    lists: List[];
  };
};
