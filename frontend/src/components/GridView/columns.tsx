"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import ActionCell from "./ActionCell";
import { Color } from "../context/colorContext";



export interface Task {
  assignee?: [{_id?:string; username: string }];
  assigner: {_id:string,username:string};
  comments?: [];
  createdAt?: string;
  description: string;
  dueDate: string;
  isDeleted?: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "TODO" | "INPROGRESS" | "TESTING" | "COMPLETED";
  tags: [{ _id:string,title: string }];
  title: string;
  updatedAt?: string;
  __v?: number;
  _id: string;
}

//sorting function(custom)
const customSortPriority = (rowA: string, rowB: string) => {
  const order = ["LOW", "MEDIUM", "HIGH"];
  return order.indexOf(rowA) - order.indexOf(rowB);
};

export const columns = (colors:Color): ColumnDef<Task>[] => [
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
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          className="p-0"
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
    cell:({row})=>{
      const status = row.original.status;
      const color= colors[status] || "#000000";
      return (<span style={{color:color}}>{status}</span>)
    }
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
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: (rowA, rowB, columnId) => {
      return customSortPriority(
        rowA.getValue(columnId),
        rowB.getValue(columnId)
      );
    },
    cell: ({ row }) => {
      const priority = row.original.priority;
      let color = "";
      switch (priority) {
        case "LOW":
          color = "green";
          break;
        case "MEDIUM":
          color = "orange";
          break;
        case "HIGH":
          color = "red";
          break;
        default:
          color = "black";
      }
      return <span style={{ color }}>{priority}</span>;
    },
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
  {
    accessorKey: "dueDate",
    header: "Due Date",
  },
  {
    id: "actions",
    cell: ActionCell,
  },
];
