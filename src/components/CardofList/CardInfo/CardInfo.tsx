import React, { useEffect, useState } from "react";
import type { FC } from "react";
/* import { v4 as uuid } from "uuid"; */
import {
  Calendar,
  CheckSquare,
  List,
  Tag,
  Trash,
  Type,
  MessageSquare,
} from "react-feather";

import { colorsList } from "../../Common/Util";
import Chip from "../../Common/Chip";
import Modal from "../../Modal/Modal";
import CustomInput from "../../CustomInput/CustomInput";
import { Styled } from "./CardInfo.styled";

import { Card, Label, Comment } from "../../../contexts/BoardContext/types";

const CardInfo: FC<any> = (props) => {
  const { onClose, card, listId, onUpdateCard } = props;

  const [selectedColor, setSelectedColor] = useState("");
  const [cardValues, setCardValues] = useState<Card>({
    ...card,
  });
  console.log(cardValues);

  const updateTitle = (value: string) => {
    setCardValues({ ...cardValues, title: value });
  };

  const updateDesc = (value: string) => {
    setCardValues({ ...cardValues, description: value });
  };

  const addComment = (value: string) => {
    const comment: Comment = {
      id: Date.now() + Math.random() * 2,
      message: value,
      /*  author:User */
    };
    setCardValues({
      ...cardValues,
      comments: [...cardValues.comments, comment],
    });
  };

  const addLabel = (label: Label) => {
    const index = cardValues.labels.findIndex(
      (item) => item.title === label.title
    );
    if (index > -1) return;

    setSelectedColor("");
    setCardValues({
      ...cardValues,
      labels: [...cardValues.labels, label],
    });
  };

  const removeLabel = (label: Label) => {
    const tempLabels = cardValues.labels.filter(
      (item) => item.title !== label.title
    );

    setCardValues({
      ...cardValues,
      labels: tempLabels,
    });
  };

  const updateDate = (duedate: string) => {
    if (!duedate) return;

    setCardValues({
      ...cardValues,
      duedate,
    });
  };

  useEffect(() => {
    if (onUpdateCard) onUpdateCard(listId, cardValues.id, cardValues);
  }, [cardValues]);

  return (
    <Styled>
      <Modal onClose={onClose}>
        <div className="cardinfo">
          <div className="cardinfo-box">
            <div className="cardinfo-box-title">
              <Type />
              <p>Title</p>
            </div>
            <CustomInput
              defaultValue={cardValues.title}
              text={cardValues.title}
              placeholder="Enter Title"
              onSubmit={updateTitle}
            />
          </div>

          <div className="cardinfo-box">
            <div className="cardinfo-box-title">
              <List />
              <p>Description</p>
            </div>
            <CustomInput
              defaultValue={cardValues.description}
              text={cardValues.description || "Add a Description"}
              placeholder="Enter description"
              onSubmit={updateDesc}
            />
          </div>

          <div className="cardinfo-box">
            <div className="cardinfo-box-title">
              <MessageSquare />
              <p>Comments</p>
            </div>
            <div className="cardinfo-box-comments">
              {cardValues.comments?.map((item: any) => (
                <div key={item.id} className="cardinfo-box-comment">
                  <p>{item.message}</p>
                </div>
              ))}
            </div>
            <CustomInput
              text={"Add a comment"}
              placeholder="Your comment"
              onSubmit={addComment}
            />
          </div>

          <div className="cardinfo-box">
            <div className="cardinfo-box-title">
              <Calendar />
              <p>Duedate</p>
            </div>
            <input
              type="date"
              defaultValue={cardValues.duedate}
              min={new Date().toISOString().substr(0, 10)}
              onChange={(event) => updateDate(event.target.value)}
            />
          </div>

          <div className="cardinfo-box">
            <div className="cardinfo-box-title">
              <Tag />
              <p>Labels</p>
            </div>
            <div className="cardinfo-box-labels">
              {cardValues.labels?.map((item: any, index: any) => (
                <Chip key={index} item={item} removeLabel={removeLabel} />
              ))}
            </div>
            <ul>
              {colorsList.map((item, index) => (
                <li
                  key={index}
                  style={{ backgroundColor: item }}
                  className={selectedColor === item ? "li-active" : ""}
                  onClick={() => setSelectedColor(item)}
                />
              ))}
            </ul>
            <CustomInput
              text="Add Label"
              placeholder="Enter label text"
              onSubmit={(value: string) =>
                addLabel({ id: Date.now() + Math.random() * 2, title: value })
              }
            />
          </div>

          <div className="cardinfo-box">
            <div className="cardinfo-box-title">
              <CheckSquare />
              <p>Checklists</p>
            </div>
            <div className="cardinfo-box-progress-bar">
              <div
                className="cardinfo-box-progress"
                /*  style={{
                width: `${calculatedPercent}%`,
                backgroundColor: calculatedPercent === 100 ? "limegreen" : "",
              }} */
              />
            </div>
            {/*    checklist yanlış yapmışım değişicek */}
            <div className="cardinfo-box-task-list">
              {cardValues.checklists?.map((item: any) => (
                <div key={item.id} className="cardinfo-box-task-checkbox">
                  <input
                    type="checkbox"
                    defaultChecked={item.completed}
                    /*    onChange={(event) =>
                    updateTask(item.id, event.target.checked)
                  } */
                  />
                  <p className={item.completed ? "completed" : ""}>
                    {item.text}
                  </p>
                  <Trash /*  onClick={() => removeTask(item.id)} */ />
                </div>
              ))}
            </div>
            <CustomInput
              text={"Add a Task"}
              placeholder="Enter task"
              /*  onSubmit={addTask} */
            />
          </div>
        </div>
      </Modal>
    </Styled>
  );
};

export default CardInfo;
