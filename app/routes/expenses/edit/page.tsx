import moment from "moment";
import {
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import z from "zod";
import { ExpenseForm } from "~/components/expenses/add/ExpenseForm";
import {
  expenseSchema,
  type ExpenseFormValues,
} from "~/components/expenses/add/validator";
import { CATEGORIES } from "~/lib/constant";
import { prisma } from "~/lib/prisma";

export const handle = {
  crumb: () => ({ label: "Edit" }), // Drop href—let layout handle linking for non-current
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  if (!id) {
    throw new Response("Expense ID is required", { status: 400 });
  }

  const expense = await prisma.expense.findUnique({
    where: { id },
  });
  const formattedExpenseData = {
    ...expense,
    id: expense?.id ?? "",
    category: CATEGORIES?.find((e) => e === expense?.category) ?? undefined,
    date: moment(expense?.date).format("YYYY-MM-DD"),
  };

  if (!expense) {
    throw new Response("Expense not found", { status: 404 });
  }

  return { expense: formattedExpenseData };
}

export async function action({ request, params }: ActionFunctionArgs) {
  const { id } = params;

  if (!id) {
    return {
      success: false,
      errors: "Expense ID is required",
    };
  }

  const formData = await request.formData();
  const rawData = Object.fromEntries(formData) as unknown as ExpenseFormValues;
  const formattedRawData = { ...rawData, amount: Number(rawData.amount) };
  const result = expenseSchema.safeParse(formattedRawData);
  if (!result.success) {
    return {
      success: false,
      errors: z.treeifyError(result.error),
      data: formattedRawData,
    };
  }

  try {
    await prisma.expense.update({
      where: { id },
      data: {
        date: new Date(result.data.date),
        description: result.data.description,
        amount: result.data.amount,
        category: result.data.category,
      },
    });

    return { success: true, message: "Expense updated successfully!" };
  } catch (error) {
    console.error("Failed to update expense:", error);
    return {
      success: false,
      errors: "Failed to update expense. Please try again.",
    };
  }
}

export default function EditExpensePage() {
  const { expense } = useLoaderData<typeof loader>();
  return <ExpenseForm defaultValues={expense} id={expense.id} />;
}
