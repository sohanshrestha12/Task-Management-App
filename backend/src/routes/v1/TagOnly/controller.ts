import { NextFunction, Response,Request } from "express";
import { successResponse } from "../../../utils/HttpResponse";
import TagsOnlyService from "./service";

const TagsOnlyController = {
  async getAllTags(req: Request, res: Response, next: NextFunction) {
    try {
      const allTags = await TagsOnlyService.getAllTags();
      return successResponse({
        response: res,
        message: "All Tags retrieved Successfully",
        data: allTags,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  },
};
export default TagsOnlyController;