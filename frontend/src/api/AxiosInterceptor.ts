import { TaskUrl } from "@/config/Axios";
import Cookies from "js-cookie";

TaskUrl.interceptors.request.use(
    (config)=>{
        const accessToken = Cookies.get('accessToken');
        if(accessToken){
            console.log('interceptor',accessToken);
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },(error)=>{
        return Promise.reject(error);
    }
)

