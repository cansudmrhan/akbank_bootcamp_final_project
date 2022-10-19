import { cardLabelService } from "services/http/endpoints/cardLabel";
import { CreateCardLabelRequestPayload } from "services/http/endpoints/cardLabel/types";

export async function action({ request, params }: any) {
  //label post
  if (request.method === "POST") {
    const payload: CreateCardLabelRequestPayload = {
      cardId: +params.cardId,
      labelId: +params.labelId,
    };
    await cardLabelService.create(payload);
  }
  //label delete
  if (request.method === "DELETE") {
    await cardLabelService.destroy(+params.labelId);
  }
}
