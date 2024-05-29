import CreateTask from "@/components/CreateTask";
import { TaskUrl } from "@/config/Axios";
import "./AxiosInterceptor";
import { Task } from "@/components/GridView/columns";
import { FormValues } from "@/components/UpdateTask";

export const getAllTasks = () => {
  return TaskUrl.get("/tasks");
};

export const getAllAssignee = () =>{
  return TaskUrl.get("/users/getAllAssignee");
}

export const createTask = (data:CreateTask) => {
  return TaskUrl.post('/tasks',data);
}

export const bulkDelete = (data:Task[]) =>{
  return TaskUrl.delete('/tasks',{data});
}

export const updateTask = (data:FormValues,taskId:string)=>{
  return TaskUrl.patch(`/tasks/${taskId}`,data);
}
