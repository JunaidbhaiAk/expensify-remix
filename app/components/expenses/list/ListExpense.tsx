import {
  Link,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router";
import { DataTable } from "~/components/ui/data-table";
import type { loader } from "~/routes/expenses/list/page";
import { columns } from "./columns";
import { Button } from "~/components/ui/button";
import { PlusIcon } from "lucide-react";
import SearchInput from "~/components/ui/search-input";
import moment from "moment";
import { SuccessAlert } from "~/components/ui/alert-types";
import { useEffect } from "react";

export default function ListExpense() {
  const { data, pageCount, pageIndex, pageSize } =
    useLoaderData<typeof loader>();

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const handlePageChange = (newPageIndex: number) => {
    searchParams.set("page", (newPageIndex + 1).toString());
    navigate(`?${searchParams.toString()}`);
  };

  const success = searchParams.get("success");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/expenses/list", { replace: true });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [navigate, searchParams]);

  return (
    <>
      <div className="flex justify-between gap-x-2 items-center">
        <SearchInput />
        <Link to="/expenses/add">
          <Button type="button">
            <PlusIcon /> Add Expenses
          </Button>
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={data?.map((e) => ({
          ...e,
          date: moment(e.date).format("MMM Do YYYY"),
        }))}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />

      {success && (
        <div className="fixed top-2 right-2">
          <SuccessAlert message="Deleted Successfully" />
        </div>
      )}
    </>
  );
}
