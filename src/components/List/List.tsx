import React, { FC, useState } from "react";
import { MoreHorizontal } from "react-feather";
import { Form, useFetcher, useLocation } from "react-router-dom";
import CardofList from "../CardofList/CardofList";
import Dropdown from "../Dropdown/Dropdown";
import CustomInput from "../CustomInput/CustomInput";
import Button from "../Button/Button";
import { Styled } from "./List.styled";

import { Card as ICard } from "types";

const List: FC<any> = ({ list, onDragEnter, onDragEnd }) => {
  const location = useLocation();
  const fetcher = useFetcher();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Styled>
      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          if (!list.cards.length && localStorage.getItem("cardId")) {
            fetcher.submit(
              {
                "card-orders": JSON.stringify([
                  {
                    cardId: Number(localStorage.getItem("cardId")),
                    listId: Number(list.id),
                    order: 0,
                  },
                ]),
              },
              {
                method: "patch",
                action: `${location.pathname}/list`,
              }
            );
            localStorage.removeItem("cardId");
          }
        }}
        className="list"
      >
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
                <Dropdown onClose={() => setShowDropdown(false)}>
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
                    <Button type="submit">Delete List</Button>
                  </Form>
                </Dropdown>
              )}
            </div>
          </div>
          <div className="list-cards custom-scroll">
            {list?.cards
              ?.sort((a: ICard, z: ICard) => a.order - z.order)
              .map((item: ICard) => (
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
