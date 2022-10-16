export type CreateChecklistitemRequestPayload = {
  checklistId: number;
  isChecked: boolean;
  title: string;
};

export type UpdateChecklistitemRequestPayload = {
  isChecked?: boolean;
  title?: string;
};

export type CreateChecklistitemResponseType = {
  data: {
    checklistId: number;
    isChecked: boolean;
    title: string;
  };
};
