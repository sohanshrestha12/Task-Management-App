import CustomError from "../../../utils/Error";
import { addCommentToTask, removeCommentFromTask } from "../Task/repository";
import { Comment } from "./model";
import {
    createComment,
    editComment,
    getComment,
    removeComment,
} from "./repository";

export const CommentsService = {
  async createComment(data: Comment, taskId: string, userId: string) {
    const comment = await createComment(data, userId);
    await addCommentToTask(taskId, comment._id.toString());
    return comment;
  },
  async getCommentById(id: string) {
    const comment = await getComment(id);
    if (!comment) {
      throw new CustomError("Comment not found", 404);
    }
    return comment;
  },

  async updateComment(body: Comment, id: string, userId: string) {
    await this.getCommentById(id);
    const res = await editComment(body, id, userId);
    if (!res) throw new CustomError("You cannot edit this comment", 403);
    return res;
  },

  async deleteComment(id: string, taskID: string, user: string) {
    await this.getCommentById(id);
    const res = await removeComment(id, user);
    if (!res) {
      throw new CustomError("Forbidden to delete the comment", 403);
    }
    const removeCommentTask = await removeCommentFromTask(id, taskID);
    return { res, removeCommentTask };
  },
};
