// ~/routes/expenses/new.tsx (or integrate into list as a modal/form)
import { redirect, type ActionFunctionArgs } from "react-router"; // Or @remix-run/node for Remix
import { DUMMY_EXPENSES } from "~/lib/constant"; // Assuming mutable for demo; use DB in real app
import { ExpenseForm } from "~/components/expenses/add/ExpenseForm";
import {
  expenseSchema,
  type ExpenseFormValues,
} from "~/components/expenses/add/validator";
import z from "zod";
import moment from "moment";

export const handle = {
  crumb: () => ({ label: "Add" }), // Drop href—let layout handle linking for non-current
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const rawData = Object.fromEntries(formData) as unknown as ExpenseFormValues;

  const result = expenseSchema.safeParse(rawData);
  if (!result.success) {
    // Updated: Use z.treeifyError for treeified errors
    return {
      errors: z.treeifyError(result.error),
      data: rawData,
      success: false,
    };
  }

  const newExpense = {
    id: DUMMY_EXPENSES.length + 1,
    ...rawData,
    amount: Number(rawData.amount),
  };
  DUMMY_EXPENSES.push(newExpense);

  // Redirect to list with success (or use json for SPA response)
  return { success: true, message: "Expense added successfully!" };
}

// Optional loader for pre-filling or errors
export async function loader() {
  return null; // Or fetch categories if dynamic
}

export default function AddExpenses() {
  return (
    <ExpenseForm
      id={0}
      defaultValues={{
        date: moment().format("YYYY-MM-DD"),
        description: "",
        amount: 0,
        category: undefined,
      }}
    />
  );
}
