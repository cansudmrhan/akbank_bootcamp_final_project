import { checklistitemService } from "services/http/endpoints/checklistitem";
import {
  CreateChecklistitemRequestPayload,
  UpdateChecklistitemRequestPayload,
} from "services/http/endpoints/checklistitem/types";

export async function action({ request, params }: any) {
  const formData = await request.formData();

  if (request.method === "POST") {
    const payload: CreateChecklistitemRequestPayload = {
      title: formData.get("card-checklistitem"),
      checklistId: +params.checklistId,
      isChecked: false,
    };

    await checklistitemService.create(payload);
  }

  if (request.method === "PATCH") {
    const payload: UpdateChecklistitemRequestPayload = {
      // title: formData.get("card-checklistitem"),
      isChecked: Boolean(formData.get("checked")),
    };

    await checklistitemService.update(+params.itemId, payload);
  }

  if (request.method === "DELETE") {
    await checklistitemService.destroy(+params.itemId);
  }
}
