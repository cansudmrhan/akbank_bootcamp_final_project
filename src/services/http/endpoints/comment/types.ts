
export type CreateCommentRequestPayload = {
  cardId:number,
  message: string,
};

export type CreateCommentResponseType = {
  data: {
    cardId:number,
    message: string,
  };
};

