import { redirect } from "react-router-dom";
import { listService } from "services/http/endpoints/list";

export function loader({ params }: any) {
  const { id } = params;

  return redirect(`/board/${id}`);
}

export async function action({ request, params }: any) {
  const formData = await request.formData();

  if (request.method === "POST") {
    const payload = {
      boardId: +params.id,
      title: formData.get("list-title"),
    };
    await listService.create(payload);
    return;
  }

  if (request.method === "PATCH") {
    
  }

  if (request.method === "DELETE") {
    const listId = +params.listId;
    await listService.destroy(listId);
  }
}
