import { commentService } from "services/http/endpoints/comment";
import {
  CreateCommentRequestPayload,
 
} from "services/http/endpoints/comment/types";

export async function action({ request, params }: any) {
  const formData = await request.formData();
  if (request.method === "POST") {
    const payload: CreateCommentRequestPayload = {
      cardId:+params.cardId,
      message: formData.get("card-comment"),
    };
    await commentService.create(payload);
  }
}
