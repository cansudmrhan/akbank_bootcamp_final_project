export type CreateListRequestPayload = {
  title: string;
  boardId: number;
};

export type CreateListResponseType = {
  data: {
    id: number;
    title: string;
  };
};
