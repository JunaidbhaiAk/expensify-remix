export interface CategoryExpense {
  category: string;
  amount: number;
}

export interface MonthlyExpense {
  month: string; // e.g., "2025-09"
  total: number;
}
