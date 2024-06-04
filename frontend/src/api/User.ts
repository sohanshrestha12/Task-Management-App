import { TaskUrl } from "@/config/Axios";
import "./AxiosInterceptor";


export const getUserById=async(id:string)=>{
    return await TaskUrl.get(`/users/${id}`);
}

export const changeStatusColor = async(field:string,color:string)=>{
    const formatColor = color.replace("#","");
    console.log('field',field,"color",formatColor)
    return await TaskUrl.patch(`/users/changeColor/${field}/${formatColor}`);
}