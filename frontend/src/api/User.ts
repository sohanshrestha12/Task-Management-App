import { TaskUrl } from "@/config/Axios";
import "./AxiosInterceptor";


export const getUserById=async(id:string)=>{
    return await TaskUrl.get(`/users/${id}`);
}