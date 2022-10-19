import { redirect } from "react-router-dom";
import { boardMemberService } from "services/http/endpoints/boardMember";

export function loader({ params }: any) {
  const { id } = params;

  return redirect(`/board/${id}`);
}

export async function action({ request, params }: any) {
  const formData = await request.formData();
  //board member post
  if (request.method === "POST") {
    const payload = {
      boardId: +params.id,
      username: formData.get("board-member"),
    };
    await boardMemberService.create(payload);
  }
  //board member delete
  if (request.method === "DELETE") {
    await boardMemberService.destroy(+params.boardMemberId);
  }
}
