import type { ColumnDef } from "@tanstack/react-table";

export const DUMMY_EXPENSES = [
  {
    id: 1,
    date: "2025-09-01",
    description: "Coffee at local cafe",
    amount: 4.75,
    category: "Food",
  },
  {
    id: 2,
    date: "2025-09-02",
    description: "Grocery shopping at supermarket",
    amount: 85.3,
    category: "Groceries",
  },
  {
    id: 3,
    date: "2025-09-03",
    description: "Gas for car",
    amount: 45.0,
    category: "Transportation",
  },
  {
    id: 4,
    date: "2025-09-04",
    description: "Monthly rent",
    amount: 1200.0,
    category: "Housing",
  },
  {
    id: 5,
    date: "2025-09-05",
    description: "Electricity bill",
    amount: 92.5,
    category: "Utilities",
  },
  {
    id: 6,
    date: "2025-09-06",
    description: "Movie tickets",
    amount: 28.0,
    category: "Entertainment",
  },
  {
    id: 7,
    date: "2025-09-07",
    description: "New jeans from online store",
    amount: 65.99,
    category: "Clothing",
  },
  {
    id: 8,
    date: "2025-09-08",
    description: "Lunch at restaurant",
    amount: 22.5,
    category: "Dining Out",
  },
  {
    id: 9,
    date: "2025-09-09",
    description: "Bus fare",
    amount: 3.25,
    category: "Transportation",
  },
  {
    id: 10,
    date: "2025-09-10",
    description: "Gym membership fee",
    amount: 49.99,
    category: "Health",
  },
  {
    id: 11,
    date: "2025-09-11",
    description: "Books from bookstore",
    amount: 35.0,
    category: "Education",
  },
  {
    id: 12,
    date: "2025-09-12",
    description: "Water bill",
    amount: 45.75,
    category: "Utilities",
  },
  {
    id: 13,
    date: "2025-09-13",
    description: "Streaming service subscription",
    amount: 15.99,
    category: "Entertainment",
  },
  {
    id: 14,
    date: "2025-09-14",
    description: "Snacks at convenience store",
    amount: 8.5,
    category: "Groceries",
  },
  {
    id: 15,
    date: "2025-09-15",
    description: "Taxi ride home",
    amount: 18.0,
    category: "Transportation",
  },
  {
    id: 16,
    date: "2025-09-16",
    description: "Doctor visit copay",
    amount: 25.0,
    category: "Healthcare",
  },
  {
    id: 17,
    date: "2025-09-17",
    description: "Internet bill",
    amount: 65.0,
    category: "Utilities",
  },
  {
    id: 18,
    date: "2025-09-18",
    description: "Dinner delivery",
    amount: 32.8,
    category: "Food",
  },
  {
    id: 19,
    date: "2025-09-19",
    description: "Shoes from mall",
    amount: 89.99,
    category: "Clothing",
  },
  {
    id: 20,
    date: "2025-09-20",
    description: "Online course fee",
    amount: 199.0,
    category: "Education",
  },
];

export const CATEGORIES = [
  "Food",
  "Groceries",
  "Transportation",
  "Housing",
  "Utilities",
  "Entertainment",
  "Clothing",
  "Dining Out",
  "Health",
  "Education",
  "Healthcare",
];

export type Expenses = {
  id: number;
  date: string;
  description: string;
  amount: number;
  category: string;
};
