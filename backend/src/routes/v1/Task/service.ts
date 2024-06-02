import CustomError from "../../../utils/Error";
import { Task } from "./model";
import { BulkDelete, createTask, deleteTask, getAllTask, getAssignedTStatus, getAssignedTasks, getTaskById, updateStatus, updateTask } from "./repository";

export const TaskService = {
  createTask(data: Task, userId: string) {
    return createTask(data, userId);
  },
  async getTaskById(id: string) {
    const task = await getTaskById(id);
    if (!task) throw new CustomError("Invalid id", 404);
    return task;
  },
  async getAllTask() {
    return await getAllTask();
  },
  async deleteTask(id: string, userId: string) {
    await this.getTaskById(id);
    const res = await deleteTask(id, userId);
    if (!res) {
      throw new CustomError("You don't have access to delete the task", 403);
    }
    return res;
  },
  async BulkDelete(body: Task[]) {
    return BulkDelete(body);
  },
  async updateTask(body: Task, id: string) {
    await this.getTaskById(id);
    const res = await updateTask(body, id);
    if (!res) {
      throw new CustomError("The requested task is not found", 404);
    }
    return res;
  },
  async getAssignedTasks(id: string) {
    return getAssignedTasks(id);
  },
  async getAssignedStatus(type: string, id: string) {
    return getAssignedTStatus(type, id);
  },
  async updateStatus(id: string, status: string) {
    return updateStatus(id, status);
  },
};