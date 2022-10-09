import React, { FC, useState } from "react";
import { MoreHorizontal } from "react-feather";

import CardofList from "../CardofList/CardofList";
import Dropdown from "../Dropdown/Dropdown";
import CustomInput from "../CustomInput/CustomInput";
import { Styled } from "./List.styled";

const List: FC<any> = ({
  list,
  onRemoveList,
  onAddCard,
  onUpdateCard,
  onRemoveCard,
}) => {
  const [showDropdown, setShowDropdown] = useState(true); //hatayı düzeltince false yap
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
              onClick={() => setShowDropdown(true)}
            >
              <MoreHorizontal />
              {showDropdown && (
                <Dropdown
                  class="list-dropdown"
                  onClose={() => setShowDropdown(false)}
                >
                  <p onClick={() => onRemoveList(list?.id)}>Delete List</p>
                </Dropdown>
              )}
            </div>
          </div>
          <div className="list-cards custom-scroll">
            {list?.cards?.map((item: any) => (
              <CardofList
                key={item.id}
                card={item}
                onRemoveCard={onRemoveCard}
                onUpdateCard={onUpdateCard}
              />
            ))}
            <CustomInput
              text="+ Add Card"
              placeholder="Enter Card Title"
              displayClass="list-add-card"
              editClass="list-add-card-edit"
              onSubmit={(value: string) => onAddCard(list?.id, value)}
            />
          </div>
        </div>
      </div>
    </Styled>
  );
};

export default List;
