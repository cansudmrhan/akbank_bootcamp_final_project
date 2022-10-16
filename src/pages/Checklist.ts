import { checklistService } from "services/http/endpoints/checklist";

export async function action({ request, params }: any) {
  const formData = await request.formData();

  if (request.method === "POST") {
    const payload = {
      cardId: +params.cardId,
      title: formData.get("card-checklist"),
    };
    await checklistService.create(payload);
  }
}
