import { TaskUrl } from "@/config/Axios";
import "./AxiosInterceptor";


export const getUserActivityLogs = () => {
  return TaskUrl.get("/userActivity");
};
