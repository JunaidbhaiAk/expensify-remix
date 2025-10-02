"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  onPageChange: (pageIndex: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageIndex,
  pageCount,
  pageSize,
  onPageChange,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    pageCount, // Required for manual pagination
    state: {
      pagination: { pageIndex, pageSize },
    },
    manualPagination: true, // Key: Enables server-side mode
    getCoreRowModel: getCoreRowModel(),
    // No getPaginationRowModel() needed for manual
  });

  const paginationItems = () => {
    const items: React.ReactNode[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(0, pageIndex - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pageCount - 1, startPage + maxVisiblePages - 1);

    // Adjust if near end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    // Previous
    items.push(
      <PaginationItem key="previous">
        <PaginationPrevious
          onClick={() => onPageChange(Math.max(0, pageIndex - 1))}
          className={
            !table.getCanPreviousPage() ? "pointer-events-none opacity-50" : ""
          }
        />
      </PaginationItem>
    );

    // Page numbers (with ellipsis)
    if (startPage > 0) {
      items.push(
        <PaginationItem key={0}>
          <PaginationLink
            onClick={() => onPageChange(0)}
            isActive={pageIndex === 0}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 1) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => onPageChange(i)}
            isActive={pageIndex === i}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < pageCount - 1) {
      if (endPage < pageCount - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      items.push(
        <PaginationItem key={pageCount - 1}>
          <PaginationLink
            onClick={() => onPageChange(pageCount - 1)}
            isActive={pageIndex === pageCount - 1}
          >
            {pageCount}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Next
    items.push(
      <PaginationItem key="next">
        <PaginationNext
          onClick={() => onPageChange(Math.min(pageCount - 1, pageIndex + 1))}
          className={
            !table.getCanNextPage() ? "pointer-events-none opacity-50" : ""
          }
        />
      </PaginationItem>
    );

    return items;
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pageCount > 1 && (
        <div className="flex items-center justify-between">
          <Pagination>
            <PaginationContent>{paginationItems()}</PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
