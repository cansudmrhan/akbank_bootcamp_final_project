import React, { FC, useEffect, useState } from "react";
import { Nav, StyledLink, Icon, NavInput, Title } from "./Navbar.styled";
import { Form, useFetcher, useNavigate } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import { User } from "contexts/BoardContext/types";

const Navbar: FC<any> = ({ selectedBoard, users }) => {
  const [showDropdown, setShowDropdown] = useState(false);
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
            <select
              /*   size="sm"  */
              className="filter-select"
              /* onChange={handleChangeCategory} */
              /*   value={filteredCategory} */
            >
              <option value={""}>Add a Member</option>
              {users?.map((user: User) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
            {/*             <Form
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
              <HoverButton type="submit">
                Delete {selectedBoard?.title || "Untitled Board"}
              </HoverButton>
            </Form> */}
          </Dropdown>
        )}
      </Icon>
    </Nav>
  );
};

export default Navbar;
