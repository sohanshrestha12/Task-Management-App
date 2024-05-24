import { NextFunction, Request, Response } from "express";
import { Task } from "./model";
import { TaskService } from "./service";
import { successResponse } from "../../../utils/HttpResponse";
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
};
export default TaskController;
