import React from "react";
import type { FC } from "react";

import { Link } from "react-router-dom";
/* import { category } from '../../services/http/endpoints/category' */
import { Styled } from "./DashboardList.styled";
import Card from "react-bootstrap/Card";
import { useBoardContext } from "../../contexts/BoardContext/BoardContext";
import { Board } from "../../contexts/BoardContext/types";


const DashboardList: FC<any> = (props) => {
  /*  const { boards } = useBoardContext(); */
  const { boards, setBoards } = useBoardContext();

  const handleAddBoard = () => {
    //yeni board açınca add list olmuyor ona bakkk
    if (boards === null) return;
    const tempBoardsList = [...boards];
    tempBoardsList.push({
      id: Date.now() + Math.random() * 2,
      title: "Untitled Board",
      ownerId: 5,
      members: [],
      lists: [],
    });
    setBoards(tempBoardsList);
  };

  return (
    <Styled>
      <h1>Scrumboard App</h1>
      <div>
        {boards?.map((board: Board) => (
          <Link key={board.id} className="link" to={`/board/${board.id}`}>
            <Card className="card" key={board.id}>
              <div className="icon">
                <span className="material-symbols-outlined">Dashboard</span>
              </div>
              <span>{board.title || "Untitled Board"}</span>
            </Card>
          </Link>
        ))}
        <Link
          className="link"
          to={`/board/${Date.now() + Math.random() * 2}`}
          onClick={handleAddBoard}
        >
          <Card className="card">
            <div className="icon">
              <span className="material-symbols-outlined">
                add_circle_outline
              </span>
            </div>
            <span>Add New Board</span>
          </Card>
        </Link>
      </div>
    </Styled>
  );
};

export default DashboardList;
