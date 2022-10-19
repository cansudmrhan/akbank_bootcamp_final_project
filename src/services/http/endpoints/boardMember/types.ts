export type CreateBoardMemberRequestPayload = {
  boardId: number;
  username: string;
};

export type UpdateBoardMemberRequestPayload = {
  boardId: number;
  username: string;
};

export type CreateBoardMemberResponseType = {
  data: {
    boardId: number;
    username: string;
  };
};
