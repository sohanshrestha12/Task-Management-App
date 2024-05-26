import { LoginUser, RegisterUser } from "@/Types/Auth";
import { TaskUrl } from "@/config/Axios";
import "./AxiosInterceptor";

export const registerUser = (userData:RegisterUser)=> {
    return TaskUrl.post("/users",userData);
}

export const verifyUser = (id:string,code:string) =>{
    return TaskUrl.post(`/users/verifyOtp/${id}/${code}`);
}

export const resendOtp = (id:string)=>{
    return TaskUrl.post(`/users/resendOtp/${id}`);
}

export const login = (userData:LoginUser) =>{
    return TaskUrl.post("/auth/login",userData);
}

export const getCurrentUser = () => {
  return TaskUrl.get("/users/getCurrentUser");
};


