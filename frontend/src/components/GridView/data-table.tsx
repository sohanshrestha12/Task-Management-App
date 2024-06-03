/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onDelete: (selectedRows: TData[]) => void;
}

import { Input } from "@/components/ui/input";
import { FaTrash } from "react-icons/fa";
import { bulkDelete } from "@/api/Task";
import { Task } from "./columns";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function DataTable<TData extends Task, TValue>({
  columns,
  data,
  onDelete,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [fieldToFilter, setFieldToFilter] = React.useState("title");
  const [rowSelection, setRowSelection] = React.useState<
    Record<number, boolean>
  >({});
  const [pageSize,setPageSize] =React.useState(5);
  const [pageIndex,setPageIndex] =React.useState(0);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
      rowSelection,
      pagination:{
        pageIndex,
        pageSize,
      }
    },
  });

     React.useEffect(() => {
       console.log("Page Index:", table.getState().pagination.pageIndex);
       console.log("Page Size:", table.getState().pagination.pageSize);
       console.log("Can Next Page:", table.getCanNextPage());
       console.log("Can Previous Page:", table.getCanPreviousPage());
       console.log("Rows Length:", table.getRowModel().rows.length);
     }, [
       table.getState().pagination.pageIndex,
       table.getState().pagination.pageSize,
       table.getCanNextPage(),
       table.getCanPreviousPage(),
       table.getRowModel().rows.length,
     ]);
  // console.log(rowSelection);
  // get the selected row data

  const selectedRowsData = Object.keys(rowSelection)
    .filter((key) => rowSelection[parseInt(key, 10)])
    .map((key) => data[parseInt(key)]);
  //  console.log(selectedRowsData);

  const handledelete = async () => {
    try {
      const response = await bulkDelete(selectedRowsData);
      console.log(response);
      onDelete(selectedRowsData);
      setRowSelection({});
      toast.success('rows deleted successfully');
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(()=>{
    console.log(fieldToFilter);
  },[fieldToFilter]);

  React.useEffect(() => {
    console.log(selectedRowsData);
  }, [selectedRowsData]);
  return (
    <div>
      <div className="flex items-center gap-4 py-4">
        <Input
          placeholder={`Filter ${fieldToFilter}...`}
          value={(table.getColumn(fieldToFilter)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(fieldToFilter)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Select onValueChange={(value) => setFieldToFilter(value)} >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Title" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="assignee">Assignee</SelectItem>
            <SelectItem value="tags">Tags</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={
            () => {
              setPageIndex((old) => Math.max(old - 1, 0));
              table.previousPage()
            }
            
          }
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setPageIndex((old) => (!table.getCanNextPage() ? old : old + 1));
            table.nextPage()}}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <div className="flex items-center mt-12">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div
          onClick={handledelete}
          className="px-4 rounded-xl py-2 bg-red-600 cursor-pointer hover:bg-red-500 transition-all"
        >
          <FaTrash className="text-white hover:text-gray-300" />
        </div>
      </div>
    </div>
  );
}
