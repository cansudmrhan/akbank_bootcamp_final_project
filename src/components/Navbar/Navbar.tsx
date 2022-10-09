import React, { FC, useState, useEffect } from "react";
import { Nav, StyledLink, NavInput, Icon } from "./Navbar.styled";
import CustomInput from "../CustomInput/CustomInput";
import Dropdown from "../Dropdown/Dropdown";
import { useParams } from "react-router-dom";

const Navbar: FC<any> = ({ onUpdateBoard, selectedBoard }) => {
  const { id } = useParams();

  const [showDropdown, setShowDropdown] = useState(false);
  const handleShowMembers = () => {};

  return (
    <Nav>
      <StyledLink className="link" to="/">
        Boards
        <span className="material-symbols-outlined">Dashboard</span>
      </StyledLink>

      <CustomInput
        text={selectedBoard?.title || "Untitled Board"}
        placeholder="Your comment"
        onSubmit={onUpdateBoard}
      />

      <Icon
        className="icon"
        onClick={(event) => {
          event.stopPropagation();
          setShowDropdown(true);
        }}
      >
        <span className="material-symbols-outlined">settings</span>
        {showDropdown && (
          <Dropdown
            class="board-dropdown"
            onClose={() => setShowDropdown(false)}
          >
            <p onClick={handleShowMembers}>Delete Card</p>
          </Dropdown>
        )}
      </Icon>
    </Nav>
  );
};

export default Navbar;
