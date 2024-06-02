import "./AxiosInterceptor";
import CreateTask from "@/components/CreateTask";
import { TaskUrl } from "@/config/Axios";
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

export const getAssignedTask = ()=>{
  return TaskUrl.get("/tasks/getAssignedTasks");
}
export const getAssignedTodo = (type:string)=>{
  return TaskUrl.get(`/tasks/getAllTodos?type=${type}`);
}
export const getUpdatedTaskStatus = (id:string,status:string)=>{
  return TaskUrl.post(`/tasks/updateStatus/${id}/${status}`);
}