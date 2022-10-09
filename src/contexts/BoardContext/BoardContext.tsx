import { useState, createContext, useContext } from "react";
import type { FC, PropsWithChildren } from "react";
import { Board, ContextType, StateType } from "./types";

const initialState: StateType = {
  selectedBoardId: null,
  boards: [
    {
      id: 0,
      title: "ACME Frontend Application",
      ownerId: 2,
      members: [],
      lists: [
        {
          id: 10,
          title: "React",
          order: 1,
          cards: [
            {
              id: 100,
              title: "Hooks",
              description: "Hooks Description",
              duedate: "10.05.2023",
              labels: [],
              comments: [],
              /*  list: "React", */
              listId: 10,
              order: 1,
              checklists: [],
            },
            {
              id: 101,
              title: "Component",
              description: "Component Description",
              duedate: "20.05.2023",
              labels: [],
              comments: [],
              /*   list: "React", */
              listId: 10,
              order: 2,
              checklists: [],
            },
            {
              id: 102,
              title: "Props",
              description: "Props Description",
              duedate: "25.05.2023",
              labels: [],
              comments: [],
              /*    list: "React", */
              listId: 10,
              order: 2,
              checklists: [
                {
                  id: 1000,
                  title: "props homework",
                  items: [
                    {
                      id: 10000,
                      title: "homework",
                      isChecked: true,
                      checklistId: 1000,
                      /*  checklist: "props homework", */
                    },
                  ],
                  /*   card: "Props", */
                  cardId: 102,
                },
              ],
            },
          ],
        },
        {
          id: 11,
          title: "Vue",
          /*  board: "ACME Frontend Application", */
          order: 2,
          cards: [
            {
              id: 100,
              title: "Hooks",
              description: "Hooks Description",
              duedate: "10.05.2023",
              labels: [],
              comments: [],
              /*   list: "Vue", */
              listId: 11,
              order: 1,
              checklists: [],
            },
            {
              id: 101,
              title: "Component",
              description: "Component Description",
              duedate: "20.05.2023",
              labels: [],
              comments: [],
              /*   list: "Vue", */
              listId: 11,
              order: 2,
              checklists: [],
            },
            {
              id: 102,
              title: "Props",
              description: "Props Description",
              duedate: "25.05.2023",
              labels: [],
              comments: [],
              /*   list: "Vue", */
              listId: 11,
              order: 2,
              checklists: [
                {
                  id: 1000,
                  title: "props homework",
                  items: [
                    {
                      id: 10000,
                      title: "homework",
                      isChecked: true,
                      checklistId: 1000,
                      /*  checklist: "props homework", */
                    },
                  ],
                  /*  card: "Props", */
                  cardId: 102,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 1,
      title: "ACME Backend Application",
      /* owner: User, */
      ownerId: 3,
      members: [],
      lists: [
        {
          id: 10,
          title: "React",
          order: 1,
          cards: [
            {
              id: 100,
              title: "Hooks",
              description: "Hooks Description",
              duedate: "10.05.2023",
              labels: [],
              comments: [],
              listId: 10,
              order: 1,
              checklists: [],
            },
            {
              id: 101,
              title: "Component",
              description: "Component Description",
              duedate: "20.05.2023",
              labels: [],
              comments: [],
              /*    list: "React", */
              listId: 10,
              order: 2,
              checklists: [],
            },
            {
              id: 102,
              title: "Props",
              description: "Props Description",
              duedate: "25.05.2023",
              labels: [],
              comments: [],
              /*   list: "React", */
              listId: 10,
              order: 2,
              checklists: [
                {
                  id: 1000,
                  title: "props homework",
                  items: [
                    {
                      id: 10000,
                      title: "homework",
                      isChecked: true,
                      checklistId: 1000,
                      /*   checklist: "props homework", */
                    },
                  ],
                  /*    card: "Props", */
                  cardId: 102,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const BoardContext = createContext<ContextType>({
  state: initialState,
  selectBoard: () => null,
  setBoards: () => null,
});

export const BoardProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<StateType>(initialState);

  const selectBoard = (id: number) => {
    setState((prev) => ({
      ...prev,
      selectedBoardId: id,
    }));
  };

  const setBoards = (boards: Board[]) => {
    setState((prev) => ({
      ...prev,
      boards,
    }));
  };

  return (
    <BoardContext.Provider
      value={{
        state,
        selectBoard,
        setBoards,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoardContext = () => {
  const { state, setBoards, selectBoard } = useContext(BoardContext);

  const { selectedBoardId, boards } = state;

  const selectedBoard = boards?.find((board) => board.id === selectedBoardId);
  
  return {
    boards,
    selectedBoard,
    selectedBoardId,
    setBoards,
    selectBoard,
  };
};
