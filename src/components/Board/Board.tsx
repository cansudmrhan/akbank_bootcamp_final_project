import React, { FC, useEffect, useState } from "react";
import { Styled } from "./Board.styled";
import List from "../List/List";
import Navbar from "../Navbar/Navbar";
import CustomInput from "../CustomInput/CustomInput";
import {
  Board as IBoard,
  User,
  List as IList,
  Card as ICard,
} from "types";
import { useFetcher, useLocation, useNavigate } from "react-router-dom";
import { useLoginContext } from "contexts/LoginContext/LoginContext";

type Props = {
  board: IBoard;
  users: User[];
};

const Board: FC<Props> = ({ board, users }) => {
  
  const location = useLocation();
  const { logout } = useLoginContext();
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    setTimeout(logout, 100);
  };

  const [targetCard, setTargetCard] = useState({
    listId: -1,
    cardId: -1,
  });
  const [lists, setLists] = useState<IList[]>([]);

  useEffect(() => {
    setLists(board.lists);
  }, [board.lists]);

  const onDragEnd = (listId: number, cardId: number) => {
    const sourceListIndex = board.lists.findIndex(
      (item: IList) => item.id === listId
    );
    if (sourceListIndex < 0) return;

    const sourceCardIndex = board.lists[sourceListIndex]?.cards?.findIndex(
      (item: ICard) => item.id === cardId
    );

    if (sourceCardIndex < 0) return;

    const targetListIndex = board.lists.findIndex(
      (item: IList) => item.id === targetCard.listId
    );
    if (targetListIndex < 0) return;

    const targetCardIndex = board.lists[targetListIndex]?.cards?.findIndex(
      (item: ICard) => item.id === targetCard.cardId
    );
    if (targetCardIndex < 0) return;

    const tempListsList = [...lists];
    const [sourceCard] = tempListsList[sourceListIndex].cards.splice(
      sourceCardIndex,
      1
    );

    tempListsList[targetListIndex].cards.splice(targetCardIndex, 0, sourceCard);
    setLists(tempListsList);
    setTargetCard({
      listId: -1,
      cardId: -1,
    });

    type ICardOrderUpdate = {
      listId: number;
      cardId: number;
      order: number;
    };

    const formData: any = {};
    tempListsList[sourceListIndex].cards.forEach((card: ICard, index) => {
      if (card.order !== index) {
        formData[card.id] = {
          listId: tempListsList[sourceListIndex].id,
          cardId: card.id,
          order: index,
        };
      }
    });
    tempListsList[targetListIndex].cards.forEach((card: ICard, index) => {
      if (
        card.order !== index ||
        card.listId !== tempListsList[targetListIndex].id
      ) {
        formData[card.id] = {
          listId: tempListsList[targetListIndex].id,
          cardId: card.id,
          order: index,
        };
      }
    });

    const payload: ICardOrderUpdate[] = Object.values(formData);
    if (!payload.length) return;
    fetcher.submit(
      {
        "card-orders": JSON.stringify(payload),
      },
      {
        method: "patch",
        action: `${location.pathname}/list`,
      }
    );
  };

  const onDragEnter = (listId: number, cardId: number) => {
    if (targetCard.cardId === cardId) {
      return;
    }
    setTargetCard((prev) => ({ ...prev, listId, cardId }));
  };

  return (
    <Styled>
      <>
        <div className="app">
          <div className="app-boards-container">
            <div className="app-boards">
              <Navbar selectedBoard={board} users={users} />
              {lists?.map((list) => (
                <List
                  key={list.id}
                  list={list}
                  onDragEnter={onDragEnter}
                  onDragEnd={onDragEnd}
                />
              ))}

              <div className="app-boards-last">
                <CustomInput
                  displayClass="app-boards-add-board"
                  editClass="app-boards-add-board-edit"
                  placeholder="Enter List Name"
                  text="Add List"
                  buttonText="Add List"
                  inputName="list-title"
                  method="post"
                  action={`${location.pathname}/list/create`}
                />
              </div>
              <footer className="footer">
                <p onClick={handleLogout}>LOGOUT</p>
              </footer>
            </div>
          </div>
        </div>
      </>
    </Styled>
  );
};

export default Board;
