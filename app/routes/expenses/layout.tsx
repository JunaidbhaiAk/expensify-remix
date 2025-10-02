import { Outlet } from "react-router";

export const handle = {
  crumb: () => ({ label: "Expenses", href: "/expenses/list" }),
};

export default function ExpensesLayout() {
  return <Outlet />; // Renders children like index or list
}
