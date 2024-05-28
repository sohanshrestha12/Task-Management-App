import { getAllTasks } from "@/api/Task";
import { useEffect, useState } from "react";
import { Task, columns } from "./columns";
import { DataTable } from "./data-table";
import CreateTask from "../CreateTask";

const Page = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const deleteTasksAndUpdateList = async (selectedRows: Task[]) => {
    try {
      // Perform deletion of selected tasks from the list
      const remainingTasks = tasks.filter(
        (task) => !selectedRows.includes(task)
      );
      setTasks(remainingTasks);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await getAllTasks();
        setTasks(res.data.data);
        console.log("dataTable", res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTask();
    
  }, []);

  const setNewTask = (newTask:Task) =>{
    setTasks([newTask,...tasks]);
  }
  return (
    <div className="px-12 py-14 w-[98vw] overflow-x-hidden">
      <div className="flex justify-between">
        <h1>All Tasks</h1>
        <CreateTask setNewTask={setNewTask} />
      </div>
      <DataTable
        columns={columns}
        data={tasks}
        onDelete={deleteTasksAndUpdateList}
      />
    </div>
  );
};

export default Page;
