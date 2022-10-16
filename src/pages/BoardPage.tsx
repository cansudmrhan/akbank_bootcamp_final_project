import { redirect, useLoaderData } from "react-router-dom";

import Board from "../components/Board/Board";
import { Board as IBoard } from "contexts/BoardContext/types";
import { boardService } from "services/http/endpoints/board";
import { UpdateBoardRequestPayload } from "services/http/endpoints/board/types";

export const loader = async ({ params }: any) => {
  const { data } = await boardService.getById(params.id);

  return data;
};

export async function action({ request, params }: any) {
  const formData = await request.formData();
  /* 
  if (request.method === "PATCH") {
    const title = formData.get("title");
    await boardService.update(params.id, { title });
  } */
  if (request.method === "PATCH") {
    const title = formData.get("title");
    const payload: UpdateBoardRequestPayload = {
      title,
    };

    if (formData.has("member")) {
      payload.members = formData.get("board-member");
    }
    await boardService.update(+params.id, payload);
  }

  if (request.method === "DELETE") {
    await boardService.destroy(params.id);
    return redirect("/");
  }
}

const BoardPage = () => {
  const data = useLoaderData() as IBoard;

  return <Board board={data} />;
};

export default BoardPage;
