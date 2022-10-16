export type CreateCardLabelRequestPayload = {
  cardId: number;
  labelId: number;
};

export type CreateCardLabelResponseType = {
  data: {
    id: number;
    cardId: number;
    labelId: number;
  };
};
