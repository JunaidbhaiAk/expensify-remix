import { ClipboardList, DollarSign, HomeIcon } from "lucide-react";

export const CATEGORIES = [
  "Food",
  "Transportation",
  "Housing",
  "Utilities",
  "Entertainment",
] as const;

export const CHART_COLORS = [
  "#8884d8", // Soft indigo (primary)
  "#82ca9d", // Mint green
  "#ffc658", // Warm amber
  "#ff8042", // Coral orange
  "#00c49f", // Teal (vibrant but not harsh)
  "#6b7280", // Cool gray (neutral)
  "#ef4444", // Soft red (for emphasis)
  "#3b82f6", // Bright but clean blue
] as const;

export const SIDEBAR_DATA =
  // This is sample data.
  {
    teams: [
      {
        name: "Expensify",
        logo: DollarSign,
        plan: "Simplify Your Expenses",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/",
        icon: HomeIcon,
      },
      {
        title: "Expenses",
        url: "/expenses",
        icon: ClipboardList,
        items: [
          {
            title: "List",
            url: "/expenses/list",
          },
          {
            title: "Add",
            url: "/expenses/add",
          },
        ],
      },
    ],
  };
