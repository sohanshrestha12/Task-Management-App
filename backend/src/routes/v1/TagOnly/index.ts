import requireUser from "../../../Middleware/requireUser";
import { Router } from "express";
import TagsOnlyController from "./controller";

const TagOnlyRouter = Router({ mergeParams: true });

TagOnlyRouter.route("/").get(requireUser, TagsOnlyController.getAllTags);

export default TagOnlyRouter;
