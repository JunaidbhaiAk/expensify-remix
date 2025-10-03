import { Prisma } from "@prisma/client";
import type { LoaderFunctionArgs } from "react-router";
import ListExpense from "~/components/expenses/list/ListExpense";
import { prisma } from "~/lib/prisma";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const pageSize = parseInt(url.searchParams.get("pageSize") || "10");
  const search = url.searchParams.get("search") || "";

  // Ensure valid pagination
  const validPage = Math.max(1, page);
  const validPageSize = Math.max(1, Math.min(pageSize, 100)); // cap at 100 for safety

  // Build Prisma query
  const where: Prisma.ExpenseWhereInput = {};
  if (search) {
    where.description = {
      contains: search,
      mode: "insensitive", // case-insensitive
    };
  }

  // Get total count for pagination
  const total = await prisma.expense.count({ where });

  // Fetch paginated data
  const expenses = await prisma.expense.findMany({
    where,
    skip: (validPage - 1) * validPageSize,
    take: validPageSize,
    orderBy: { date: Prisma.SortOrder.desc }, // most recent first
  });

  const pageCount = Math.ceil(total / validPageSize);

  return {
    data: expenses,
    pageCount,
    pageIndex: validPage - 1,
    pageSize: validPageSize,
    total,
  };
}

export const handle = {
  crumb: () => ({ label: "List" }), // Drop href—let layout handle linking for non-current
};

export default function Page() {
  return <ListExpense />;
}
