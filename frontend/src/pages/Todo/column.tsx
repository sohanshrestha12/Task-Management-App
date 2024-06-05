"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { Task } from "@/components/GridView/columns";
import { getUpdatedTaskStatus } from "@/api/Task";
import { toast } from "sonner";
import axios from "axios";
import { Color } from "@/components/context/colorContext";

const customSortPriority = (rowA: string, rowB: string) => {
  const order = ["LOW", "MEDIUM", "HIGH"];
  return order.indexOf(rowA) - order.indexOf(rowB);
};
const moveToTodo = async (
  id: string,
  status: string,
  updateTaskStatus: (task: Task) => void
) => {
  try {
    const res = await getUpdatedTaskStatus(id, status);
    if (res) toast.success(`Moved to ${status} successfully`);
    updateTaskStatus(res.data.data);
    console.log("grid view update status", res);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message);
    } else {
      console.log(error);
    }
  }
};

export const columns = (
  updateTaskStatus: (task: Task) => void,
  colors: Color
): ColumnDef<Task>[] => [
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
    cell: ({ row }) => {
      const status = row.original.status;
      const color = colors[status] || "#000000";
      return <span style={{ color: color }}>{status}</span>;
    },
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
    cell: ({ row }) => {
      const task = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(task._id)}
            >
              Copy task ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              disabled={task.status === "TODO"}
              onClick={() => moveToTodo(task._id, "TODO", updateTaskStatus)}
            >
              Move to Todo
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={task.status === "INPROGRESS"}
              onClick={() =>
                moveToTodo(task._id, "INPROGRESS", updateTaskStatus)
              }
            >
              Move to In Progress
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={task.status === "TESTING"}
              onClick={() => moveToTodo(task._id, "TESTING", updateTaskStatus)}
            >
              Move to Testing
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={task.status === "COMPLETED"}
              onClick={() =>
                moveToTodo(task._id, "COMPLETED", updateTaskStatus)
              }
            >
              Move to Completed
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
