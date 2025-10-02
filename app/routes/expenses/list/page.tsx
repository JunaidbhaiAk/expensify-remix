import ListExpense from "~/components/expenses/list/ListExpense";
import { DUMMY_EXPENSES } from "~/lib/constant";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const pageSize = parseInt(url.searchParams.get("pageSize") || "10");
  const search = String(url.searchParams.get("search") || "");
  let filteredData = DUMMY_EXPENSES;
  if (search?.length) {
    filteredData = filteredData.filter(({ description }) =>
      description?.toLowerCase()?.includes(search)
    );
  }

  const total = filteredData.length;
  const pageCount = Math.ceil(total / pageSize);
  const offset = (page - 1) * pageSize;
  const data = filteredData.slice(offset, offset + pageSize);

  return { data, pageCount, pageIndex: page - 1, pageSize };
}

export const handle = {
  crumb: () => ({ label: "List" }), // Drop href—let layout handle linking for non-current
};

export default function Page() {
  return <ListExpense />;
}
