import { redirect } from "react-router-dom";
import { listService } from "services/http/endpoints/list";
import { cardService } from "services/http/endpoints/card";
import { UpdateCardRequestPayload } from "services/http/endpoints/card/types";
import { Card as ICard } from "../contexts/BoardContext/types";

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
  }

  if (request.method === "PATCH") {
    if (formData.has("card-orders")) {
      const cards = JSON.parse(formData.get("card-orders"));
      await Promise.all(
        cards.map((updateCardOrderPayload: any) => {
          return cardService.update(updateCardOrderPayload.cardId, {
            listId: updateCardOrderPayload.listId,
            order: updateCardOrderPayload.order,
          });
        })
      );
    }
  }

  if (request.method === "DELETE") {
    const listId = +params.listId;
    await listService.destroy(listId);
  }
}
