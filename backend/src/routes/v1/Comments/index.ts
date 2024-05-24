import { Router } from "express";
import CommentsController from "./controller";
import { requireUser } from "../../../Middleware/requireUser";

const CommentsRouter = Router({ mergeParams: true });

// Create a Comment
CommentsRouter.route("/").post(requireUser, CommentsController.createComment);

//Get a comment by id

CommentsRouter.route("/:id").get(
  requireUser,
  CommentsController.getCommentById
);

// Edit a Comment
CommentsRouter.route("/:id").patch(
  requireUser,
  CommentsController.updateComment
);

// Delete a Comment
CommentsRouter.route("/:id").delete(
  requireUser,
  CommentsController.deleteComment
);

export default CommentsRouter;
