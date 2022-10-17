import { redirect } from "react-router-dom";
import { userService } from "services/http/endpoints/user";

export async function loader({ params }: any) {
  const  users  = await userService.getAll();

  const { id } = params;

  return redirect(`/board/${id}`);
}

