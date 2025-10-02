import { redirect, useLoaderData } from "react-router";
import z from "zod";
import { ExpenseForm } from "~/components/expenses/add/ExpenseForm";
import {
  expenseSchema,
  type ExpenseFormValues,
} from "~/components/expenses/add/validator";
import { DUMMY_EXPENSES } from "~/lib/constant";

export const handle = {
  crumb: () => ({ label: "Edit" }), // Drop href—let layout handle linking for non-current
};

export async function loader({ params }: { params: { id: string } }) {
  const expense = DUMMY_EXPENSES.find((e) => e.id === Number(params.id));
  if (!expense) throw new Response("Not found", { status: 404 });
  return { expense };
}

export async function action({
  request,
  params,
}: {
  request: Request;
  params: { id: string };
}) {
  const formData = await request.formData();
  const rawData = Object.fromEntries(formData) as unknown as ExpenseFormValues;

  const result = expenseSchema.safeParse(rawData);
  if (!result.success) {
    return {
      errors: z.treeifyError(result.error),
      data: rawData,
      success: false,
    };
  }
  const updated = {
    id: Number(params.id),
    ...rawData,
  };

  const idx = DUMMY_EXPENSES.findIndex((e) => e.id === Number(params.id));
  if (idx !== -1) {
    DUMMY_EXPENSES[idx] = updated;
  }

  return { success: true, message: "Expense updated successfully!" };
}

export default function EditExpensePage() {
  const { expense } = useLoaderData<typeof loader>();
  return <ExpenseForm defaultValues={expense} id={expense.id} />;
}
