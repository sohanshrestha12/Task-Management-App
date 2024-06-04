import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ViewTaskDetails from "../ViewTaskDetails";
import { Button } from "../ui/button";
import { Row } from "@tanstack/react-table";
import { Task } from "./columns";
import { useState } from "react";
import UpdateTask from "../UpdateTask";
import { useAuth } from "../Auth/ProtectedRoutes";

interface ActionsCellProps {
  row: Row<Task>;
}

const ActionCell: React.FC<ActionsCellProps> = ({ row }) => {
  const Task = row.original;
  const {user} = useAuth();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  
  const handleUpdateDialogOpen = () => setUpdateDialogOpen(true);
  const handleUpdateDialogClose = () => setUpdateDialogOpen(false);

  return (
    <>
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
            onClick={() => navigator.clipboard.writeText(Task._id)}
          >
            Copy task ID 
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleUpdateDialogOpen} disabled={user?._id !== Task.assigner._id}>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDialogOpen}>
            View task details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ViewTaskDetails
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        task={Task}
      />
      <UpdateTask
        isOpen={isUpdateDialogOpen}
        onClose={handleUpdateDialogClose}
        task={Task}
      />
    </>
  );
};
export default ActionCell;
