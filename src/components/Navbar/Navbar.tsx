import React, { FC, useEffect, useState } from "react";
import { Nav, StyledLink, Icon, NavInput, Title } from "./Navbar.styled";
import { Form, useFetcher} from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import Member from "../Member/Member";
import Button from "../Button/Button";


const Navbar: FC<any> = ({ selectedBoard, users }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === "submitting") {
      setEditTitle(false);
    }
  }, [fetcher.state]);

  const cancelUpdate = (event: any) => {
    if (event.code === "Escape") {
      setEditTitle(false);
    }
  };

  return (
    <Nav>
      <StyledLink to="/">BOARDS</StyledLink>

      <fetcher.Form method="patch">
        {editTitle ? (
          <NavInput
            name="title"
            defaultValue={selectedBoard?.title || "Untitled Board"}
            onKeyDown={cancelUpdate}
            autoFocus
          />
        ) : (
          <Title
            className="custom-input-display"
            onClick={() => setEditTitle(true)}
          >
            {selectedBoard.title}
            <span className="material-symbols-outlined">visibility</span>
          </Title>
        )}
      </fetcher.Form>

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
            {showModal && <Member onClose={() => setShowModal(false)}  users={users}  selectedBoard={selectedBoard} />}
            <Button className="member" onClick={() => setShowModal(true)}>
              Add Member
            </Button>

            <Form
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
              <Button type="submit">
                Delete {selectedBoard?.title || "Untitled Board"}
              </Button>
            </Form>
          </Dropdown>
        )}
      </Icon>
    </Nav>
  );
};

export default Navbar;
