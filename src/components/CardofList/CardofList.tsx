import React, { useState, FC } from "react";
import {
  AlignLeft,
  CheckSquare,
  Clock,
  MoreHorizontal,
  MessageSquare,
} from "react-feather";
import { Form, useLocation } from "react-router-dom";

import { formatDate } from "../Common/Util";
import Chip from "../Common/Chip";
import Dropdown from "../Dropdown/Dropdown";
import CardInfo from "./CardInfo/CardInfo";
import { Styled } from "./CardofList.styled";
import Button from "../Button/Button";

const CardofList: FC<any> = ({ card, onDragEnter, onDragEnd }) => {
  const location = useLocation();
  const {
    id,
    title,
    description,
    duedate,
    labels,
    comments,
    listId,
    checklists,
  } = card;
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  var num = 0;
  const isCheckListsCompleted = () => {
    checklists.forEach((checklist: any) => {
      if (
        checklist.items?.filter((item: any) => item.completed).length ===
        checklist.items.length
      ) {
        // console.log("arttı");
        num++;
      } else {
        // console.log("değişmedi");
      }
    });
    return num;
  };

  return (
    <Styled>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={card}
          listId={listId}
        />
      )}
      <div
        key={id}
        draggable
        className="card"
        onDragEnd={(event) => {
          onDragEnd(listId, id);
          event.currentTarget.style["backgroundColor"] = "";
          event.currentTarget.style.opacity = "1";
        }}
        onDragEnter={() => onDragEnter(listId, id)}
        onDragStart={(event) => {
          localStorage.setItem("cardId", id);
          event.currentTarget.style["backgroundColor"] = "#2736E6";
          event.currentTarget.style.opacity = "0.6";
        }}
        onClick={() => setShowModal(true)}
      >
        <div className="card-top">
          <div className="card-top-labels">
            {labels?.map((item: any, index: any) => (
              <Chip key={index} item={item} />
            ))}
          </div>
          <div
            className="card-top-more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(true);
            }}
          >
            <MoreHorizontal />
            {showDropdown && (
              <Dropdown
                class="board-dropdown"
                onClose={() => setShowDropdown(false)}
              >
                <Form
                  action={`${location.pathname}/list/${listId}/card/${id}`}
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
                  <Button type="submit">Delete Card</Button>
                </Form>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="card-title">
          {title} ({card.id})
        </div>
        <div>
          <p title={description}>
            <AlignLeft />
          </p>
        </div>
        <div className="card-footer">
          {duedate && (
            <p className="card-footer-item">
              <Clock className="card-footer-icon" />
              {formatDate(duedate)}
            </p>
          )}

          {comments && comments?.length > 0 && (
            <p className="card-footer-item">
              <MessageSquare className="card-footer-icon" />
              {comments?.length}
            </p>
          )}
          {checklists && checklists?.length > 0 && (
            <p className="card-footer-item">
              <CheckSquare className="card-footer-icon" />
              {isCheckListsCompleted()}/{checklists?.length}
            </p>
          )}
        </div>
      </div>
    </Styled>
  );
};

export default CardofList;
