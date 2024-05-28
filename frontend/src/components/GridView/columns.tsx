"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "@/components/ui/checkbox";


export interface Task {
  assignee: [{ username: string }];
  assigner: string;
  comments: [];
  createdAt: string;
  description: string;
  dueDate:string;
  isDeleted: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "TODO" | "INPROGRESS" | "TESTING" | "COMPLETED";
  tags: [{title:string}];
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
}



//sorting function(custom)
const customSortPriority = (rowA:string,rowB:string)=>{
  const order =["LOW","MEDIUM","HIGH"];
  return order.indexOf(rowA) - order.indexOf(rowB);
}

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "_id",
    header: "Id",
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "assignee",
    header: "Assignee",
    accessorFn: (row) => {
      if (row.assignee && row.assignee.length > 0) {
        const usernames: string[] = row.assignee.map(
          (assignee) => assignee.username
        );
        return usernames.join(", ");
      }
      return "";
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <Button className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: (rowA,rowB,columnId) =>{
      return customSortPriority(rowA.getValue(columnId),rowB.getValue(columnId));
    }
  },
  {
    accessorKey: "tags",
    header: "Tags",
    accessorFn: (row) => {
      if (row.tags && row.tags.length > 0) {
        const title: string[] = row.tags.map((tag) => tag.title);
        return title.join(", ");
      }
      return "";
    },
  },
];
