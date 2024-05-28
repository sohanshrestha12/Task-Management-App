import CustomError from "../../../utils/Error";
import { Task } from "./model";
import { BulkDelete, createTask, deleteTask, getAllTask, getTaskById } from "./repository";

export const TaskService = {
    createTask(data:Task,userId:string){
        return createTask(data,userId);
    },
    async getTaskById(id:string){
        const task = await getTaskById(id);
        if(!task) throw new CustomError("Invalid id",404);
        return task;
    },
    async getAllTask(){
        return await getAllTask();
    },
    async deleteTask(id:string,userId:string){
        await this.getTaskById(id);
        const res = await deleteTask(id,userId);
        if(!res){
            throw new CustomError("You don't have access to delete the task",403);
        }
        return res;
    },
    async BulkDelete(body:Task[]){
        return BulkDelete(body);
    }
}