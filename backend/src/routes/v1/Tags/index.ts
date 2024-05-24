import requireUser from "../../../Middleware/requireUser";
import { Router } from "express";
import TagsController from "./controller";

const TagRouter = Router({mergeParams:true});

TagRouter.route("/").post(requireUser, TagsController.createTags);
TagRouter.route('/:id').get(requireUser,TagsController.getTagsById);
TagRouter.route("/:id").patch(
  requireUser,
  TagsController.updateTag
);
TagRouter.route("/:id").delete(
  requireUser,
  TagsController.deleteTag
);


export default TagRouter;