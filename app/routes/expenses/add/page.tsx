// ~/routes/expenses/new.tsx (or integrate into list as a modal/form)
import { type ActionFunctionArgs } from "react-router"; // Or @remix-run/node for Remix
import { ExpenseForm } from "~/components/expenses/add/ExpenseForm";
import {
  expenseSchema,
  type ExpenseFormValues,
} from "~/components/expenses/add/validator";
import z from "zod";
import moment from "moment";
import { prisma } from "~/lib/prisma";

export const handle = {
  crumb: () => ({ label: "Add" }), // Drop href—let layout handle linking for non-current
};

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const rawData = Object.fromEntries(
      formData
    ) as unknown as ExpenseFormValues;
    const formattedRawData = { ...rawData, amount: Number(rawData.amount) };

    const result = expenseSchema.safeParse(formattedRawData);
    if (!result.success) {
      // Updated: Use z.treeifyError for treeified errors
      return {
        errors: z.treeifyError(result.error),
        data: formattedRawData,
        success: false,
      };
    }
    const response = await prisma.expense.create({
      data: {
        date: new Date(result.data.date), // Prisma expects Date object
        description: result.data.description,
        amount: parseFloat(result.data.amount.toString()),
        category: result.data.category,
      },
    });
    return {
      success: true,
      message: "Expense added successfully!",
      errors: null,
      id: response.id,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to save expense. Please try again.",
      errors: "Database error",
    };
  }
}

// Optional loader for pre-filling or errors
export async function loader() {
  return null; // Or fetch categories if dynamic
}

export default function AddExpenses() {
  return (
    <ExpenseForm
      id="0"
      defaultValues={{
        date: moment().format("YYYY-MM-DD"),
        description: "",
        amount: 0,
        category: undefined,
      }}
    />
  );
}
