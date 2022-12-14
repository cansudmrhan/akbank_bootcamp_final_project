export interface User {
  id: string;
  username: string;
  password?: string;
}

export interface Label {
  id: number;
  title: string;
  color: string;
}

export interface Comment {
  id: number;
  message: string;
  author: User;
}

export interface ChecklistItem {
  id: number;
  title: string;
  isChecked: boolean;
  checklistId: number;
  /*   checklist: Checklist; */
}

export interface Checklist {
  id: number;
  title: string;
  items: ChecklistItem[];
  /*  card: Card[]; */
  cardId: number;
}

export interface Card {
  id: number;
  title: string;
  description: string;
  duedate: string;
  labels: Label[];
  comments: Comment[];
  /*  list: List; */
  listId: number;
  order: number;
  checklists: Checklist[];
}

export interface List {
  id: number;
  title: string;
  /*   board: Board; */
  order: number;
  cards: Card[];
}

export interface Board {
  id: number;
  title: string;
  ownerId: number;
  members?: User[];
  lists: List[];
  createdAt: string;
  updatedAt: string;
}

export type StateType = {
  boards: Board[];
};

export type ContextType = {
  state: StateType;
  selectedBoard: Board | undefined;
  setBoards: any;
  deleteBoard: any;
};
