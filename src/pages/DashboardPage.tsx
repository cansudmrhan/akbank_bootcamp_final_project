import React, { FC, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { board } from "services/http/endpoints/board";
import { useBoardContext } from "contexts/BoardContext/BoardContext";
import DashboardList from "../components/Dashboard/DashboardList";
import { Board } from "contexts/BoardContext/types";
type Props = {};

export const loader = async () => {
  const { data } = await board.list();

  return Promise.resolve(data as Board[]);
};

const DashboardPage: FC<Props> = () => {
  const data = useLoaderData() as Board[];
  const { setBoards } = useBoardContext();

  useEffect(() => {}, [data, setBoards]);

  return <DashboardList />;
};

export default DashboardPage;
