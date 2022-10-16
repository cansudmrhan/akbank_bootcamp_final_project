import React, { useEffect, FC } from "react";
import { redirect, useLoaderData } from "react-router-dom";
import { boardService } from "services/http/endpoints/board";
import DashboardList from "../components/Dashboard/DashboardList";
import { Board, Label as ILabel } from "contexts/BoardContext/types";
import { useAppContext } from "contexts/AppContext/AppContext";
type Props = {};

export const action = async () => {
  const response = await boardService.create({ title: "Untitled Board" });
  return redirect(`/board/${response.data.id.toString()}`);
};

export const loader = async () => {
  const { data } = await boardService.list();
  const { data: labels } = await boardService.getLabels();

  return { labels, data };
};

const DashboardPage: FC<Props> = () => {
  const { data, labels } = useLoaderData() as {
    data: Board[];
    labels: ILabel[];
  };
  const { setLabels } = useAppContext();

  useEffect(() => setLabels(labels), [labels, setLabels]);

  return <DashboardList list={data} />;
};

export default DashboardPage;
