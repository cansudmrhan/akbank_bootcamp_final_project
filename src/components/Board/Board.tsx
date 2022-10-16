import React, { FC } from "react";
import { Styled } from "./Board.styled";
import List from "../List/List";
import Navbar from "../Navbar/Navbar";
import CustomInput from "../CustomInput/CustomInput";
import { Board as IBoard } from "contexts/BoardContext/types";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoginContext } from "contexts/LoginContext/LoginContext";

type Props = {
  board: IBoard;
};

const Board: FC<Props> = ({ board }) => {
  const location = useLocation();
  const { logout } = useLoginContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    setTimeout(logout, 100);
  };

  return (
    <Styled>
      <>
        <div className="app">
          <div className="app-boards-container">
            <div className="app-boards">
              <Navbar selectedBoard={board} />
              {board?.lists?.map((list) => (
                <List
                  key={list.id}
                  list={list}
                  boardId={board.id}
                  board={board}
                />
              ))}

              <div className="app-boards-last">
                <CustomInput
                  displayClass="app-boards-add-board"
                  editClass="app-boards-add-board-edit"
                  placeholder="Enter List Name"
                  text="Add List"
                  buttonText="Add List"
                  inputName="list-title"
                  method="post"
                  action={`${location.pathname}/list/create`}
                />
              </div>
              <footer className="footer">
                <p onClick={handleLogout}>LOGOUT</p>
              </footer>
            </div>
          </div>
        </div>
      </>
    </Styled>
  );
};

export default Board;
