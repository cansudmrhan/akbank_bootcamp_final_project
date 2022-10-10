import React, { useState, FC } from "react";
import {
  AlignLeft,
  CheckSquare,
  Clock,
  MoreHorizontal,
  MessageSquare,
} from "react-feather";
import { formatDate } from "../Common/Util";
import Chip from "../Common/Chip";
import Dropdown from "../Dropdown/Dropdown";
import CardInfo from "./CardInfo/CardInfo";
import { Styled } from "./CardofList.styled";

import { useBoardContext } from "../../contexts/BoardContext/BoardContext";

const CardofList: FC<any> = (props) => {
  const { card, onRemoveCard, onUpdateCard } = props;
  const { title, description, duedate, labels, comments, listId, checklists } =
    card;
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  return (
    <Styled>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={card}
          listId={listId}
          onUpdateCard={onUpdateCard}
        />
      )}
      <div
        className="card"
        key={card.id}
        draggable
        /*   onDragEnd={() => onDragEnd(boardId, id)}
        onDragEnter={() => onDragEnter(boardId, id)} */
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
                <p onClick={() => onRemoveCard(listId, card.id)}>Delete Card</p>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="card-title">{title}</div>
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
              {checklists?.filter((item: any) => item.completed)?.length}/
              {checklists?.length}
            </p>
          )}
        </div>
      </div>
    </Styled>
  );
};

export default CardofList;
