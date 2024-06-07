import { useTasks } from "@/components/context/taskContext";
import { columns } from "./column";
import { DataTable } from "./data-table";
import { useState } from "react";
import { useAuth } from "@/components/Auth/ProtectedRoutes";
import UpdateTask from "@/components/UpdateTask";
import { Task } from "@/components/GridView/columns";
import { PaginationState } from "@tanstack/react-table";
import { useColor } from "@/components/context/colorContext";
import axios from "axios";
import { toast } from "sonner";
import { deleteTask } from "@/api/Task";

const CreatedTasks = () => {
  const { assigner, updateTasks } = useTasks();
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const { user } = useAuth();
  const {tasks,deleteTasks} = useTasks();
    const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });
    const {colors} = useColor();
  

  const handleUpdateDialogOpen = (task: Task) => {
    setActiveTask(task);
    setUpdateDialogOpen(true);
  };
  const handleUpdateDialogClose = () => {
    setActiveTask(null), setUpdateDialogOpen(false);
  };

  const handleDeleteTask = async(id:string) => {
    console.log(id);
    try {
      const res = await deleteTask(id);
      const newUpdatedTasks = tasks.filter((task)=>task._id !== res.data?.data?._id);
      deleteTasks(newUpdatedTasks);
      toast.success("Deleted task successfully");
      console.log(res);
    } catch (error) {
      console.log(error);
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data.message);
      }else{
        toast.error("Unable to delete the task right now.");
      }
    }
  }
  console.log("created tasks", assigner);
  return (
    <div className="px-12 mt-[95px] py-14 ml-1 w-[82vw] col-span-12 col-start-3 rounded border border-white overflow-x-hidden bg-white">
      <h1 className="mb-5">Assigned Tasks</h1>
      <DataTable
        pagination={pagination}
        setPagination={setPagination}
        columns={columns(updateTasks, handleUpdateDialogOpen, user!, colors,handleDeleteTask)}
        data={assigner}
      />
      {activeTask && (
        <UpdateTask
          isOpen={isUpdateDialogOpen}
          onClose={handleUpdateDialogClose}
          task={activeTask}
        />
      )}
    </div>
  );
};

export default CreatedTasks;
