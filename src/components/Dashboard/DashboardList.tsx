import React, { PropsWithChildren } from "react";
import type { FC } from "react";
import { Form, Link } from "react-router-dom";
import {
  DashboardStyle,
  UnstyledButton,
  Title,
  Card,
} from "./DashboardList.styled";

import { Board } from "../../types";

type Props = {
  list: Board[];
};

const DashboardList: FC<PropsWithChildren<Props>> = ({ list }) => {
  return (
    <li>
      <Title>Scrumboard App</Title>
      <DashboardStyle>
        {list?.map((board: Board) => (
          <Link key={board.id} className="link" to={`/board/${board.id}`}>
            <Card className="card" key={board.id}>
              <div>
                <span className="material-symbols-outlined">Dashboard</span>
              </div>
              <span>{board.title || "Untitled Board"}</span>
            </Card>
          </Link>
        ))}
        <Form method="put" action="/?index">
          <UnstyledButton type="submit">
            <Card className="card cursor-pointer">
              <div>
                <span className="material-symbols-outlined">
                  add_circle_outline
                </span>
              </div>
              <span>Add New Board</span>
            </Card>
          </UnstyledButton>
        </Form>
      </DashboardStyle>
    </li>
  );
};

export default DashboardList;
