// ~/lib/validators/expense.ts
import { z } from "zod";
import { CATEGORIES } from "~/lib/constant";

export const expenseSchema = z.object({
  date: z.string(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(255, "Description too long"),
  amount: z
    .number({ error: "Amount is required" })
    .positive("Amount must be positive")
    .max(10000, "Amount too high"),
  category: z.enum(CATEGORIES),
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;
