import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 30 hardcoded expenses across all 12 months of 2025
const EXPENSES = [
  // January
  {
    date: "2025-01-05",
    description: "Grocery shopping",
    amount: 89.5,
    category: "Food",
  },
  {
    date: "2025-01-12",
    description: "Gas refill",
    amount: 60.0,
    category: "Transportation",
  },
  {
    date: "2025-01-01",
    description: "Monthly rent",
    amount: 1200.0,
    category: "Housing",
  },
  {
    date: "2025-01-10",
    description: "Electricity bill",
    amount: 92.3,
    category: "Utilities",
  },
  {
    date: "2025-01-20",
    description: "Movie tickets",
    amount: 32.0,
    category: "Entertainment",
  },

  // February
  {
    date: "2025-02-03",
    description: "Lunch at cafe",
    amount: 18.75,
    category: "Food",
  },
  {
    date: "2025-02-14",
    description: "Uber ride",
    amount: 24.5,
    category: "Transportation",
  },
  {
    date: "2025-02-01",
    description: "Monthly rent",
    amount: 1200.0,
    category: "Housing",
  },
  {
    date: "2025-02-11",
    description: "Internet bill",
    amount: 65.0,
    category: "Utilities",
  },
  {
    date: "2025-02-28",
    description: "Streaming subscription",
    amount: 15.99,
    category: "Entertainment",
  },

  // March
  {
    date: "2025-03-07",
    description: "Dinner delivery",
    amount: 29.99,
    category: "Food",
  },
  {
    date: "2025-03-18",
    description: "Bus fare",
    amount: 3.5,
    category: "Transportation",
  },
  {
    date: "2025-03-01",
    description: "Monthly rent",
    amount: 1200.0,
    category: "Housing",
  },
  {
    date: "2025-03-12",
    description: "Water bill",
    amount: 45.2,
    category: "Utilities",
  },
  {
    date: "2025-03-22",
    description: "Concert tickets",
    amount: 75.0,
    category: "Entertainment",
  },

  // April
  {
    date: "2025-04-04",
    description: "Morning coffee",
    amount: 5.25,
    category: "Food",
  },
  {
    date: "2025-04-15",
    description: "Car maintenance",
    amount: 120.0,
    category: "Transportation",
  },
  {
    date: "2025-04-01",
    description: "Monthly rent",
    amount: 1200.0,
    category: "Housing",
  },
  {
    date: "2025-04-10",
    description: "Gas bill",
    amount: 78.4,
    category: "Utilities",
  },
  {
    date: "2025-04-25",
    description: "Video game purchase",
    amount: 59.99,
    category: "Entertainment",
  },

  // May–December: 1 expense per month per category (5 × 8 = 40 → too many!)
  // Instead, distribute remaining 10 across May–Dec (2–3 per month)

  // May
  { date: "2025-05-06", description: "Brunch", amount: 34.5, category: "Food" },
  {
    date: "2025-05-19",
    description: "Metro card",
    amount: 28.0,
    category: "Transportation",
  },
  {
    date: "2025-05-01",
    description: "Monthly rent",
    amount: 1200.0,
    category: "Housing",
  },

  // June
  { date: "2025-06-08", description: "Snacks", amount: 12.3, category: "Food" },
  {
    date: "2025-06-21",
    description: "Taxi ride",
    amount: 19.8,
    category: "Transportation",
  },
  {
    date: "2025-06-01",
    description: "Monthly rent",
    amount: 1200.0,
    category: "Housing",
  },

  // July
  {
    date: "2025-07-03",
    description: "BBQ groceries",
    amount: 67.2,
    category: "Food",
  },
  {
    date: "2025-07-14",
    description: "Bike repair",
    amount: 42.0,
    category: "Transportation",
  },
  {
    date: "2025-07-01",
    description: "Monthly rent",
    amount: 1200.0,
    category: "Housing",
  },

  // August
  {
    date: "2025-08-09",
    description: "Ice cream",
    amount: 8.99,
    category: "Food",
  },
  {
    date: "2025-08-22",
    description: "Train ticket",
    amount: 35.5,
    category: "Transportation",
  },
  {
    date: "2025-08-01",
    description: "Monthly rent",
    amount: 1200.0,
    category: "Housing",
  },

  // September
  { date: "2025-09-05", description: "Coffee", amount: 4.75, category: "Food" },
  {
    date: "2025-09-16",
    description: "Gas",
    amount: 55.0,
    category: "Transportation",
  },
  {
    date: "2025-09-01",
    description: "Monthly rent",
    amount: 1200.0,
    category: "Housing",
  },

  // October
  { date: "2025-10-07", description: "Pizza", amount: 26.4, category: "Food" },
  {
    date: "2025-10-18",
    description: "Rideshare",
    amount: 22.3,
    category: "Transportation",
  },
  {
    date: "2025-10-01",
    description: "Monthly rent",
    amount: 1200.0,
    category: "Housing",
  },

  // November
  {
    date: "2025-11-04",
    description: "Thanksgiving groceries",
    amount: 112.0,
    category: "Food",
  },
  {
    date: "2025-11-20",
    description: "Airport shuttle",
    amount: 48.0,
    category: "Transportation",
  },
  {
    date: "2025-11-01",
    description: "Monthly rent",
    amount: 1200.0,
    category: "Housing",
  },

  // December
  {
    date: "2025-12-06",
    description: "Holiday dinner",
    amount: 85.0,
    category: "Food",
  },
  {
    date: "2025-12-24",
    description: "Holiday taxi",
    amount: 32.5,
    category: "Transportation",
  },
  {
    date: "2025-12-01",
    description: "Monthly rent",
    amount: 1200.0,
    category: "Housing",
  },
];

async function main() {
  console.log("Seeding 30 hardcoded expenses for 2025...");

  for (const expense of EXPENSES) {
    await prisma.expense.create({
      data: {
        date: new Date(expense.date),
        description: expense.description,
        amount: expense.amount,
        category: expense.category,
      },
    });
  }

  console.log(`✅ Successfully seeded 30 expenses.`);
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
