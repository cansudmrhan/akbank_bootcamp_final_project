import { cardService } from "services/http/endpoints/card";
import { UpdateCardRequestPayload } from "services/http/endpoints/card/types";

export async function action({ request, params }: any) {
  const formData = await request.formData();

  // card create
  if (request.method === "POST") {
    const payload = {
      title: formData.get("card-title"),
      listId: +params.listId,
    };
    await cardService.create(payload);
  }

  // card update
  if (request.method === "PATCH") {
    const listId = +params.listId;
    const cardId = +params.cardId;
    const payload: UpdateCardRequestPayload = {
      listId,
    };

    if (formData.has("card-title")) {
      payload.title = formData.get("card-title");
    }
    if (formData.has("card-date")) {
      payload.duedate = formData.get("card-date");
    }
    if (formData.has("card-description")) {
      payload.description = formData.get("card-description");
    }
    await cardService.update(cardId, payload);
  }

  // card delete
  if (request.method === "DELETE") {
    await cardService.destroy(+params.cardId);
  }
}
