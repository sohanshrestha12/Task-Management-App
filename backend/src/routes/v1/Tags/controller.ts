import { NextFunction, Request, Response } from "express";
import { Tags } from "./models";
import { TaskService } from "../Task/service";
import TagsService from "./service";
import { successResponse } from "../../../utils/HttpResponse";
import CustomError from "../../../utils/Error";

const TagsController = {
  async createTags(
    req: Request<
      {
        taskId: string;
      },
      unknown,
      Tags
    >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { taskId } = req.params;
      const body = req.body;
      const userId = res.locals.user._id as string;
      await TaskService.getTaskById(taskId);
      const result = await TagsService.createTags(body, taskId, userId);
      return successResponse({
        response: res,
        message: "Tag created successfully",
        data: result,
        status: 201,
      });
    } catch (error) {
      next(error);
    }
  },
  async getTagsById(
    req: Request<{ id: string }, unknown, unknown>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      const result = await TagsService.getTagById(id);
      return successResponse({
        response: res,
        message: "Tag retrieved successfully",
        data: result,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  },
  async updateTag(
    req: Request<{ taskId: string; id: string }, unknown, Partial<Tags>>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { taskId, id } = req.params;
      const body = req.body;
      const userId = res.locals.user._id as string;
      const task = await TaskService.getTaskById(taskId);
      if (!task || !task.tags) {
        throw new CustomError("task doesnt exist", 404);
      }
      const tagExists = task.tags.includes(id as never);

      if (!tagExists) {
        return res.status(404).json({ message: "Tag not found in task" });
      }
      const result = await TagsService.updateTags(body, id, userId);
      return successResponse({
        response: res,
        message: "Tag edited successfully",
        data: result,
        status: 201,
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteTag(
    req: Request<{ id: string; taskId: string }, unknown, unknown>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id, taskId } = req.params;
      const user = res.locals.user._id as string;
      const task = await TaskService.getTaskById(taskId);
      if (!task || !task.tags) {
        throw new CustomError("task doesnt exist", 404);
      }
      const tagExists = task.tags.includes(id as never);

      if (!tagExists) {
        return res.status(404).json({ message: "Tag not found in task" });
      }

      const result = await TagsService.deleteTag(id, taskId, user);
      return successResponse({
        response: res,
        message: "Tag Deleted Successfully",
        data: result,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  },
 
};

export default TagsController;
