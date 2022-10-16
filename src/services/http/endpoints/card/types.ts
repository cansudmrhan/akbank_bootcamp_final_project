// bu aslında yine tam create için değil yani bunu yapacaksın aslında
// alttaki optional olanları
// UpdateCardRequestPayload'e ekleyebilirsin daha mantıklı olur gibi geldi
// @TODO
export type CreateCardRequestPayload = {
  title: string;
  listId: number;
 /*  description?: string;
  duedate?: string;
  order?: number; */
};

export type CreateCardResponseType = {
  data: {
    id: number;
    title: string;
  };
};

export type UpdateCardRequestPayload = {
  title?: string;
  listId: number;
  description?: string;
  duedate?: string;
  order?: number;
};
