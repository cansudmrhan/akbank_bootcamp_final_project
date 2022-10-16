export type CreateChecklistRequestPayload = {
  cardId: number;
  title: string;
};

export type CreateChecklistResponseType = {
  data: {
    cardId: number;
    title: string;
  };
};
