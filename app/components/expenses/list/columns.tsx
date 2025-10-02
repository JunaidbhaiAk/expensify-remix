import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate, useSubmit } from "react-router";
import { Button } from "~/components/ui/button";
import type { Expenses } from "~/lib/constant";

export const columns: ColumnDef<Expenses>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const submit = useSubmit();
      const navigate = useNavigate();
      const expense = row.original;

      return (
        <div className="flex items-center w-full">
          <Button
            onClick={() => navigate(`/expenses/edit/${expense.id}`)}
            variant="outline"
            size="icon"
            className="rounded-none first:rounded-l-md last:rounded-r-md font-semibold hover:bg-green-600/20 hover:text-green-600"
          >
            <Edit />
          </Button>
          <Button
            onClick={() => {
              submit(
                { id: expense.id },
                { method: "delete", action: "/expenses/delete" }
              );
            }}
            variant="outline"
            size="icon"
            className="rounded-none first:rounded-l-md last:rounded-r-md hover:bg-rose-500/20 hover:text-rose-500"
          >
            <Trash2 />
          </Button>
        </div>
      );
    },
  },
];
