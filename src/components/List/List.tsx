import React, { FC, useEffect, useState } from "react";
import { MoreHorizontal } from "react-feather";
import { Form } from "react-router-dom";
import CardofList from "../CardofList/CardofList";
import Dropdown from "../Dropdown/Dropdown";
import CustomInput from "../CustomInput/CustomInput";
import { Styled } from "./List.styled";
import { HoverButton, UnstyledButton } from "shared/Button";
import { useLocation } from "react-router-dom";

import { List as IList, Card as ICard } from "contexts/BoardContext/types";

const List: FC<any> = ({ list, board }) => {
  //////////////////////////////////////////////////////////////////
  const [targetCard, setTargetCard] = useState({
    listId: 0,
    cardId: 0,
  });
  const [lists, setLists] = useState<IList[]>([]);
  useEffect(() => {
    setLists(board.lists);
  }, []);

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

    const targetCardIndex = board[targetListIndex]?.cards?.findIndex(
      (item: ICard) => item.id === targetCard.cardId
    );
    if (targetCardIndex < 0) return;

    const tempListsList = [...lists];
    const sourceCard = tempListsList[sourceListIndex].cards[sourceCardIndex];
    tempListsList[sourceListIndex].cards.splice(sourceCardIndex, 1);
    tempListsList[targetListIndex].cards.splice(targetCardIndex, 0, sourceCard);
    setLists(tempListsList);

    setTargetCard({
      listId: 0,
      cardId: 0,
    });
  };

  const onDragEnter = (listId: number, cardId: number) => {
    if (targetCard.cardId === cardId) return;
    setTargetCard({
      listId: listId,
      cardId: cardId,
    });
  };
  ///////////////////////////////////////////////////////////////////////

  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <Styled>
      <div className="list">
        <div className="list-inner" key={list?.id}>
          <div className="list-header">
            <p className="list-header-title">
              {list?.title}
              <span>{list?.cards?.length || 0}</span>
            </p>
            <div
              className="list-header-title-more"
              onClick={(event) => {
                event.stopPropagation();
                setShowDropdown(true);
              }}
            >
              <MoreHorizontal />
              {showDropdown && (
                <Dropdown
                  class="list-dropdown"
                  onClose={() => setShowDropdown(false)}
                >
                  <Form
                    action={`${location.pathname}/list/${list?.id}`}
                    method="delete"
                    onSubmit={(event) => {
                      if (
                        !window.confirm(
                          "Please confirm you want to delete this record."
                        )
                      ) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <HoverButton type="submit">Delete List</HoverButton>
                  </Form>
                </Dropdown>
              )}
            </div>
          </div>
          <div className="list-cards custom-scroll">
            {list?.cards?.map((item: any) => (
              <CardofList
                key={item.id}
                card={item}
                onDragEnter={onDragEnter}
                onDragEnd={onDragEnd}
              />
            ))}
          </div>
          <CustomInput
            displayClass="list-add-card"
            editClass="list-add-card-edit"
            placeholder="Enter Card Title"
            text="Add Card"
            buttonText="Add Card"
            inputName="card-title"
            method="post"
            action={`${location.pathname}/list/${list?.id}/card`}
          />
        </div>
      </div>
    </Styled>
  );
};

export default List;
