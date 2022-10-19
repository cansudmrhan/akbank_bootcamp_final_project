import { checklistitemService } from "services/http/endpoints/checklistitem";
import {
  CreateChecklistitemRequestPayload,
  UpdateChecklistitemRequestPayload,
} from "services/http/endpoints/checklistitem/types";

export async function action({ request, params }: any) {
  const formData = await request.formData();

  //checklistitem post
  if (request.method === "POST") {
    const payload: CreateChecklistitemRequestPayload = {
      title: formData.get("card-checklistitem"),
      checklistId: +params.checklistId,
      isChecked: false,
    };
    await checklistitemService.create(payload);
  }

  //checklistitem patch
  if (request.method === "PATCH") {
    const payload: UpdateChecklistitemRequestPayload = {
      isChecked: Boolean(formData.get("checked")),
    };
    await checklistitemService.update(+params.itemId, payload);
  }
  
  //checklistitem delete
  if (request.method === "DELETE") {
    await checklistitemService.destroy(+params.itemId);
  }
}
