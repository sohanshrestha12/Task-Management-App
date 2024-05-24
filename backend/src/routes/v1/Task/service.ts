import CustomError from "../../../utils/Error";
import { Task } from "./model";
import { createTask, getTaskById } from "./repository";

export const TaskService = {
    createTask(data:Task,userId:string){
        return createTask(data,userId);
    },
    async getTaskById(id:string){
        const task = await getTaskById(id);
        if(!task) throw new CustomError("Invalid id",404);
        return task;
    }
}