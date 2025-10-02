import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

const expenseRoutes = [
  layout("routes/expenses/layout.tsx", [
    index("routes/expenses/page.tsx"),
    route("list", "routes/expenses/list/page.tsx"),
    route("add", "routes/expenses/add/page.tsx"),
    route("delete", "routes/expenses/delete/page.tsx"),
    route("edit/:id", "routes/expenses/edit/page.tsx"),
  ]),
];

export default [
  layout("routes/layout.tsx", [
    index("routes/page.tsx"),
    ...prefix("expenses", [...expenseRoutes]),
  ]),
] satisfies RouteConfig;
