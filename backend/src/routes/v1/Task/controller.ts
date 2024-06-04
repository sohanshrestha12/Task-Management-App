import { NextFunction, Request, Response } from "express";
import { Task } from "./model";
import { TaskService } from "./service";
import { successResponse } from "../../../utils/HttpResponse";
import CustomError from "../../../utils/Error";
const TaskController = {
  async createTask(
    req: Request<unknown, unknown, Task>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = req.body;
      const userId = res.locals.user._id as string;
      const result = await TaskService.createTask(body, userId);
      return successResponse({
        response: res,
        message: "Successfully created task",
        data: result,
        status: 201,
      });
    } catch (error) {
      next(error);
    }
  },
  async getAllTask(req: Request, res: Response, next: NextFunction) {
    try {
      const result = (await TaskService.getAllTask()).slice().reverse();
      return successResponse({
        response: res,
        message: "Successfully retrieved all tasks",
        data: result,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  },
  async getTaskById(
    req: Request<{ id: string }, unknown, unknown>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const result = await TaskService.getTaskById(id);
      return successResponse({
        response: res,
        message: "Successfully retrieved the task",
        data: result,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteTask(
    req: Request<{ id: string }, unknown, unknown>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const userId = res.locals.user._id;
      const result = await TaskService.deleteTask(id, userId);
      return successResponse({
        response: res,
        message: "Task Deleted Successfully",
        data: result,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  },
  async BulkDelete(
    req: Request<unknown, unknown, Task[]>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = req.body;
      const result = await TaskService.BulkDelete(body);
      return successResponse({
        response: res,
        message: "Bulk Task Deleted Successfully",
        data: result,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  },
  async updateTask(
    req: Request<{ id: string }, unknown, Task>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const body = req.body;
      const result = await TaskService.updateTask(body, id);
      return successResponse({
        response: res,
        message: "Updated Task Successfully",
        data: result,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  },
  async getAssignedTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const id = res.locals.user._id;
      const assignedTask = await TaskService.getAssignedTasks(id);
      return successResponse({
        response: res,
        message: "Fetch assigned Task successfully",
        data: assignedTask,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  },
  async getAllStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { type } = req.query;
      const id = res.locals.user._id;
      if (!type) throw new CustomError("No type", 404);
      const assignedTask = await TaskService.getAssignedStatus(
        type.toString(),
        id
      );
      return successResponse({
        response: res,
        message: "Fetch assigned Todo successfully",
        data: assignedTask,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  },
  async updateStatus(req: Request<{id:string,status:string},unknown,unknown>, res: Response, next: NextFunction) {
    try {
      const { id,status } = req.params;
      if(!id) throw new CustomError("Invalid operation",400);
      if(!status) throw new CustomError("Invalid operation",400);
      if(status == 'COMPLETED'){
        const task = await TaskService.getTaskById(id);
        if(!task) throw new CustomError("Invalid operation",400);
        if(task.status !== "TESTING") throw new CustomError("Cannot directly move to Completed.",400);
      }
      const updateStatus = await TaskService.updateStatus(id?.toString(),status?.toString());
      return successResponse({
        response: res,
        message: "Task status updated successfully",
        data: updateStatus,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  },
  async getAssignerTasks(req:Request<{id:string},unknown,unknown>,res:Response,next:NextFunction){
    try {
      const {id} = req.params;
      if(!id) throw new CustomError('Invalid operation',400);
      const getAssignerTask = await TaskService.getAssignerTasks(id);
      if(!getAssignerTask) throw new CustomError('task does not exist',404);
      return successResponse({
        response: res,
        message: "Assigner's tasks retrieved successfully",
        data: getAssignerTask,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  },

};
export default TaskController;
