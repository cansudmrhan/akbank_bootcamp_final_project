import { redirect, useLoaderData } from "react-router-dom";

import Board from "../components/Board/Board";
import { Board as IBoard, User } from "types";
import { boardService } from "services/http/endpoints/board";
import { userService } from "services/http/endpoints/user";

export const loader = async ({ params }: any) => {
  const { data } = await boardService.getById(params.id);
  const { data: users } = await userService.getAll();

  return { data, users };
};

export async function action({ request, params }: any) {
  const formData = await request.formData();
  
  //board update
  if (request.method === "PATCH") {
    const title = formData.get("title");
    await boardService.update(params.id, { title });
  }
  //board delete
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
