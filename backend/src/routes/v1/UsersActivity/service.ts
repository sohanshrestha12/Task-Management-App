import { getAllUserActivity } from "./repository";

const UsersActivityService = {
    async getAllUserActivity(id:string){
        return getAllUserActivity(id);
    }

}

export default UsersActivityService;