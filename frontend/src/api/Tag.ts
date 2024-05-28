import { TaskUrl } from "@/config/Axios";
import "./AxiosInterceptor";
export const getAllTags = () => {
    return TaskUrl.get('/tags');
};
