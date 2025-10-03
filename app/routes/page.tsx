import ExpenseDashboard from "~/components/dashboard/ExpensesDashboard";
import { prisma } from "~/lib/prisma";

export const handle = {
  crumb: () => ({ label: "Dashboard" }),
};

export async function loader() {
  try {
    const response = await prisma.expense.findMany({});
    return { expenses: response };
  } catch (error) {
    return { expenses: [] };
  }
}

export default function Page() {
  return <ExpenseDashboard />;
}
