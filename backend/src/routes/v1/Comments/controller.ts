import { NextFunction, Request, Response } from "express";
import { successResponse } from "../../../utils/HttpResponse";
import { Comment } from "./model";
import { CommentsService } from "./service";
import { TaskService } from "../Task/service";
import CustomError from "../../../utils/Error";

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
      const {updatedComment,comment} = await CommentsService.createComment(body, taskId, userId);
      const reversedComments = updatedComment?.comments?.reverse();
      return successResponse({
        response: res,
        message: "Commented successfully",
        data: {reversedComments,comment},
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
    req: Request<{ id: string; taskId: string }, unknown, Comment>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id, taskId } = req.params;

      const body = req.body;
      const userId = res.locals.user._id as string;
      const task = await TaskService.getTaskById(taskId);
      if (!task || !task.comments) {
        throw new CustomError("task doesnt exist", 404);
      }
      const CommentExists = task.comments.includes(id as never);

      if (!CommentExists) {
        return res.status(404).json({ message: "Comment not found in task" });
      }
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
      const task = await TaskService.getTaskById(taskId);
      if (!task || !task.comments) {
        throw new CustomError("task doesnt exist", 404);
      }
      const CommentExists = task.comments.includes(id as never);

      if (!CommentExists) {
        return res.status(404).json({ message: "Comment not found in task" });
      }

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
