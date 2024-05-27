import { TaskUrl } from "@/config/Axios";

export const getAllTasks = () => {
  return TaskUrl.get("/tasks");
};
