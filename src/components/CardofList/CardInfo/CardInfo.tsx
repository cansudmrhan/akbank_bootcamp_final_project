import React, { useEffect, useState } from "react";
import type { FC } from "react";
import { Form, useFetcher, useParams } from "react-router-dom";

import {
  Calendar,
  CheckSquare,
  List,
  Tag,
  Trash,
  Type,
  MessageSquare,
} from "react-feather";

import Chip from "../../Common/Chip";
import Modal from "../../Modal/Modal";
import CustomInput from "../../CustomInput/CustomInput";

import { Card, Comment, Checklist, ChecklistItem } from "../../../types";
import { useAppContext } from "contexts/AppContext/AppContext";
import { UnstyledButton } from "components/Common/Button";
import { Styled } from "./CardInfo.styled";

const CardInfo: FC<any> = (props) => {
  const { onClose, card, listId } = props;
  const { id: boardId } = useParams();
  const { labels } = useAppContext();

  const [selectedColor, setSelectedColor] = useState(1);
  const [cardValues, setCardValues] = useState<Card>({
    ...card,
  });
  const fetcher = useFetcher();

  const calculatePercent = (index: number) => {
    if (!cardValues.checklists?.length) return 0;
    const completed = cardValues.checklists[index].items.filter(
      (item) => item.isChecked
    )?.length;
    return (completed / cardValues.checklists[index].items.length) * 100;
  };

  useEffect(() => {
    setCardValues(props.card);
  }, [props.card]);

  const updateCard = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const formData = new FormData();
    formData.set("card-date", value);
    formData.set("title", card.title);
    fetcher.submit(formData, {
      method: "patch",
      action: `/board/${boardId}/list/${listId}/card/${card?.id}`,
    });
  };

  const itemFetcher = useFetcher();
  const updateChecklistItem = (
    event: React.FormEvent<HTMLInputElement>,
    checklistId: number,
    itemId: number
  ) => {
    const isChecked = event.currentTarget.checked;
    const formData = new FormData();
    formData.set("checked", isChecked.toString());
    itemFetcher.submit(formData, {
      method: "patch",
      action: `/board/${boardId}/list/${listId}/card/${card?.id}/checklist/${checklistId}/item/${itemId}`,
    });
  };

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
              text={cardValues.title}
              placeholder="Enter Title"
              inputName="card-title"
              method="patch"
              action={`/board/${boardId}/list/${listId}/card/${card?.id}`}
            />
          </div>

          <div className="cardinfo-box">
            <div className="cardinfo-box-title">
              <List />
              <p>Description</p>
            </div>
            <CustomInput
              text={cardValues.description || "Add a Description"}
              placeholder="Enter description"
              inputName="card-description"
              method="patch"
              action={`/board/${boardId}/list/${listId}/card/${card?.id}`}
            />
          </div>

          <div className="cardinfo-box">
            <div className="cardinfo-box-title">
              <MessageSquare />
              <p>Comments</p>
            </div>
            <table className="cardinfo-box-comments">
              {cardValues.comments?.map((item: Comment) => (
                <tbody key={item.id} className="cardinfo-box-comment">
                  <tr>
                    <td className="author">{item.author.username}:</td>
                    <td>{item.message}</td>
                  </tr>
                </tbody>
              ))}
            </table>
            <CustomInput
              text={"Add a comment"}
              placeholder="Your comment"
              inputName="card-comment"
              method="post"
              action={`/board/${boardId}/list/${listId}/card/${card?.id}/comment/create`}
            />
          </div>

          <div className="cardinfo-box">
            <div className="cardinfo-box-title">
              <Calendar />
              <p>Duedate</p>
            </div>
            <fetcher.Form method="patch" className="cardinfo-box__datepicker">
              <input
                autoFocus
                type="date"
                defaultValue={cardValues.duedate}
                min={new Date().toISOString().substr(0, 10)}
                name="card-date"
                onChange={updateCard}
              />
            </fetcher.Form>
          </div>

          <div className="cardinfo-box">
            <div className="cardinfo-box-title">
              <Tag />
              <p>Labels</p>
            </div>
            <div className="cardinfo-box-labels">
              {cardValues.labels?.map((item: any, index: number) => (
                <Chip
                  key={index}
                  item={item}
                  action={`/board/${boardId}/list/${listId}/card/${card?.id}/card-label/${item?.CardLabel?.id}`}
                />
              ))}
            </div>
            <ul>
              {labels.map((item) => (
                <li
                  key={item.id}
                  style={{ backgroundColor: item.color }}
                  className={selectedColor === item.id ? "li-active" : ""}
                  onClick={() => setSelectedColor(item.id)}
                />
              ))}
            </ul>
            <CustomInput
              text="Add Label"
              placeholder="Enter label text"
              method="post"
              action={`/board/${boardId}/list/${listId}/card/${card?.id}/card-label/${selectedColor}/create`}
              inputName="card-label"
            />
          </div>

          <div className="cardinfo-box">
            {cardValues.checklists?.map((checklist: Checklist, index) => (
              <div key={checklist.id}>
                <div className="cardinfo-box-title">
                  <CheckSquare />
                  <p> Checklist : {checklist.title} </p>
                </div>
                <div className="cardinfo-box-progress-bar">
                  <div
                    className="cardinfo-box-progress"
                    style={{
                      width: `${calculatePercent(index)}%`,
                      backgroundColor:
                        calculatePercent(index) === 100 ? "limegreen" : "",
                    }}
                  />
                </div>

                <div className="cardinfo-box-task-list">
                  {checklist?.items.map((item: ChecklistItem) => (
                    <div key={item.id} className="cardinfo-box-task-checkbox">
                      <div className="cardinfo-box-task-checkbox__first">
                        <itemFetcher.Form method="patch">
                          <input
                            type="checkbox"
                            defaultChecked={item.isChecked}
                            onChange={(event) =>
                              updateChecklistItem(
                                event,
                                checklist?.id,
                                item?.id
                              )
                            }
                          />
                        </itemFetcher.Form>
                        <p
                          onDoubleClick={() => console.log("double cliened,")}
                          className={item.isChecked ? "completed" : ""}
                        >
                          {item.title}
                        </p>
                      </div>
                      <Form
                        method="delete"
                        action={`/board/${boardId}/list/${listId}/card/${card?.id}/checklist/${checklist?.id}/item/${item.id}`}
                      >
                        <UnstyledButton type="submit">
                          <Trash />
                        </UnstyledButton>
                      </Form>
                    </div>
                  ))}

                  <CustomInput
                    text={"Add a item"}
                    placeholder="Add a item"
                    inputName="card-checklistitem"
                    method="post"
                    action={`/board/${boardId}/list/${listId}/card/${card?.id}/checklist/${checklist?.id}/item/create`}
                  />
                </div>
              </div>
            ))}
            <CustomInput
              text={"Add a checklist"}
              placeholder="Add a checklist"
              inputName="card-checklist"
              method="post"
              action={`/board/${boardId}/list/${listId}/card/${card?.id}/checklist/create`}
            />
          </div>
        </div>
      </Modal>
    </Styled>
  );
};

export default CardInfo;
