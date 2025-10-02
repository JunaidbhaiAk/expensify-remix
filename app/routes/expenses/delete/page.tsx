import { redirect } from "react-router";
import { DUMMY_EXPENSES } from "~/lib/constant";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const id = formData.get("id") as string;

  // Filter out the deleted item (in a real app, delete from DB)
  const index = DUMMY_EXPENSES.findIndex((e) => e.id === Number(id));
  if (index > -1) {
    DUMMY_EXPENSES.splice(index, 1);
  }

  // Redirect back to the list so loader runs again
  return redirect("/expenses/list");
}
