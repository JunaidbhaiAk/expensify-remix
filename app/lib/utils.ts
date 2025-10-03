import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type {
  CategoryExpense,
  MonthlyExpense,
} from "~/components/dashboard/types";
import moment from "moment";
import type { Expense } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Group expenses by category
export const groupByCategory = (expenses: Expense[]): CategoryExpense[] => {
  const grouped: Record<string, number> = {};
  expenses.forEach((expense) => {
    grouped[expense.category] =
      (grouped[expense.category] || 0) + Number(expense.amount);
  });

  return Object.entries(grouped).map(([category, amount]) => ({
    category,
    amount: parseFloat(Number(amount).toFixed(2)),
  }));
};

// Group by month (YYYY-MM)
export const groupByMonth = (expenses: Expense[]): MonthlyExpense[] => {
  const grouped: Record<string, number> = {};
  expenses.forEach((expense) => {
    const month = moment(expense.date).format("YYYY-MM"); // "2025-09"
    grouped[month] = (grouped[month] || 0) + expense.amount;
  });

  return Object.entries(grouped)
    .map(([month, total]) => ({
      month,
      total: parseFloat(Number(total).toFixed(2)),
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
};

export const getMonthNames = Array.from({ length: 12 }, (_, i) =>
  moment().month(i).format("MMM")
);
