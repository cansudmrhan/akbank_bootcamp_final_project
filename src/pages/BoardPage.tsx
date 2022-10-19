import { redirect, useLoaderData } from "react-router-dom";

import Board from "../components/Board/Board";
import { Board as IBoard, User } from "contexts/BoardContext/types";
import { boardService } from "services/http/endpoints/board";
import { userService } from "services/http/endpoints/user";
import { UpdateBoardRequestPayload } from "services/http/endpoints/board/types";

export const loader = async ({ params }: any) => {
  const { data } = await boardService.getById(params.id);
  const { data: users } = await userService.getAll();

  return { data, users };
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
      console.log("board patch");
    }
    await boardService.update(+params.id, payload);
  }

  if (request.method === "DELETE") {
    await boardService.destroy(params.id);
    return redirect("/");
  }
}

const BoardPage = () => {
  const { data, users } = useLoaderData() as { data: IBoard; users: User[] };

  return <Board board={data} users={users} />;
};

export default BoardPage;
