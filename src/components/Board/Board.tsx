import React, { FC } from "react";
import { Styled } from "./Board.styled";
import List from "../List/List";
import Navbar from "../Navbar/Navbar";
import CustomInput from "../CustomInput/CustomInput";
import { useBoardContext } from "../../contexts/BoardContext/BoardContext";
import { useParams } from "react-router-dom";

const Board: FC<any> = (props) => {
  const { boards, setBoards } = useBoardContext();
  const { id } = useParams();

  const selectedBoard = boards?.find((board) => board.id === +id!);
  console.log(id);

  const handleUpdateBoard = (title: string) => {
    if (boards === null) return;
    const boardIndex = boards.findIndex((item: any) => item.id === +id!);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];

    tempBoardsList[boardIndex].title = title;

    setBoards(tempBoardsList);
  };

  const handleAddList = (title: string) => {
    if (boards === null) return;
    const boardIndex = boards.findIndex((item: any) => item.id === +id!);
    console.log(boardIndex);
    const tempBoardsList = [...boards];
    tempBoardsList[boardIndex].lists.push({
      id: Date.now() + Math.random() * 2,
      title: title,
      order: 4,
      cards: [],
    });
    setBoards(tempBoardsList);
  };
  const handleRemoveList = (listId: number) => {
    if (boards === null) return;
    const boardIndex = boards.findIndex((item: any) => item.id === +id!);
    const tempBoardsList = [...boards];
    const lists = tempBoardsList[+boardIndex!].lists;
    const listIndex = lists?.findIndex((item: any) => item.id === listId);
    if (listIndex < 0) return;
    lists.splice(listIndex, 1);
    setBoards(tempBoardsList);
  };

  const handleAddCard = (listId: any, title: string) => {
    if (boards === null) return;
    const boardIndex = boards.findIndex((item: any) => item.id === +id!);
    if (boardIndex < 0) return;
    const listIndex = boards[boardIndex].lists.findIndex(
      (list: any) => list.id === +listId!
    );
    if (listIndex < 0) return;
    const tempBoardsList = [...boards];
    tempBoardsList[boardIndex].lists[listIndex].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
      description: "",
      duedate: "",
      labels: [],
      comments: [],
      listId: listId,
      order: 10,
      checklists: [],
    });
    setBoards(tempBoardsList);
  };

  const handleRemoveCard = (listId: number, cardId: number) => {
    if (boards === null) return;
    const boardIndex = boards.findIndex((item: any) => item.id === +id!);
    if (boardIndex < 0) return;

    const listIndex = boards[boardIndex].lists.findIndex(
      (list: any) => list.id === +listId!
    );
    if (listIndex < 0) return;

    const tempBoardsList = [...boards];
    const cards = tempBoardsList[boardIndex].lists[listIndex].cards;

    const cardIndex = cards.findIndex((item) => item.id === cardId);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setBoards(tempBoardsList);
  };

  const handleUpdateCard = (listId: number, cardId: number, card: any) => {
    if (boards === null) return;
    const boardIndex = boards.findIndex((item: any) => item.id === +id!);
    if (boardIndex < 0) return;

    const listIndex = boards[boardIndex].lists.findIndex(
      (list: any) => list.id === +listId!
    );
    if (listIndex < 0) return;

    const tempBoardsList = [...boards];
    const cards = tempBoardsList[boardIndex].lists[listIndex].cards;

    const cardIndex = cards.findIndex((item) => item.id === cardId);
    if (cardIndex < 0) return;

    tempBoardsList[boardIndex].lists[listIndex].cards[cardIndex] = card;

    setBoards(tempBoardsList);
  };

  return (
    <Styled>
      <>
        <div className="app">
          <div className="app-boards-container">
            <div className="app-boards">
              <Navbar
                onUpdateBoard={handleUpdateBoard}
                selectedBoard={selectedBoard}
              />
              {selectedBoard?.lists.map((list) => (
                <List
                  key={list.id}
                  list={list}
                  boardId={id}
                  onRemoveList={handleRemoveList}
                  onAddCard={handleAddCard}
                  onUpdateCard={handleUpdateCard}
                  onRemoveCard={handleRemoveCard}
                />
              ))}

              <div className="app-boards-last">
                <CustomInput
                  displayClass="app-boards-add-board"
                  editClass="app-boards-add-board-edit"
                  placeholder="Enter List Name"
                  text="Add List"
                  buttonText="Add List"
                  onSubmit={handleAddList}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    </Styled>
  );
};

export default Board;
