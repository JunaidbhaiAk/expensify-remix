import { redirect, type ActionFunctionArgs } from "react-router";
import { prisma } from "~/lib/prisma";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const id = formData.get("id") as string;

  if (!id) {
    throw new Response("Missing expense ID", { status: 400 });
  }

  try {
    await prisma.expense.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Failed to delete expense:", error);
    throw new Response("Failed to delete expense", { status: 500 });
  }

  // Redirect back to expenses list to re-run loader
  return redirect("/expenses/list?success=deleted");
}
