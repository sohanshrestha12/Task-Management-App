import { NextFunction, Request, Response } from "express";
import { successResponse } from "../../../utils/HttpResponse";
import { Comment } from "./model";
import { CommentsService } from "./service";
import { TaskService } from "../Task/service";

const CommentsController = {
  async createComment(
    req: Request<{ taskId: string }, unknown, Comment>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { taskId } = req.params;
      const body = req.body;
      const userId = res.locals.user._id as string;
      await TaskService.getTaskById(taskId);
      const result = await CommentsService.createComment(body, taskId, userId);
      return successResponse({
        response: res,
        message: 'Commented successfully',
        data: result,
        status: 201,
      });
    } catch (error) {
      next(error);
    }
  },
  async getCommentById(
    req: Request<{ id: string }, unknown, unknown>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      const result = await CommentsService.getCommentById(id);
      return successResponse({
        response: res,
        message: "Comment retrieved successfully",
        data: result,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateComment(
    req: Request<{ id: string ,taskId:string}, unknown, Comment>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id,taskId } = req.params;

      const body = req.body;
      const userId = res.locals.user._id as string;
      await TaskService.getTaskById(taskId);
      const result = await CommentsService.updateComment(body, id, userId);
      return successResponse({
        response: res,
        message: "Comment edited successfully",
        data: result,
        status: 201,
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteComment(
    req: Request<{ id: string; taskId: string }, unknown, unknown>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id, taskId } = req.params;
      const author = res.locals.user._id as string;
      await TaskService.getTaskById(taskId);

      const result = await CommentsService.deleteComment(id, taskId, author);
      return successResponse({
        response: res,
        message: "Comment Deleted Successfully",
        data: result,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default CommentsController;
