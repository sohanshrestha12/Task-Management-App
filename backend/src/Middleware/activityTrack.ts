import { NextFunction, Request, Response } from "express";
import { UsersActivityModel } from "../routes/v1/UsersActivity/models";
import { getTaskById } from "../routes/v1/Task/repository";

const activityTrack =
  (action: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.method === "POST" && action === "Changed Task Status") {
          const { status,id } = req.params;
          const task = await getTaskById(id); 
        const userActivity = new UsersActivityModel({
          userId: res.locals.user._id,
          action: action + " to " + status,
          title:task?.title
        });
        await userActivity.save();
      } else if (req.method === "POST" || req.method === "PATCH") {
        const { title } = req.body;
        const userActivity = new UsersActivityModel({
          userId: res.locals.user._id,
          action: action,
          title: title,
        });
        await userActivity.save();
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default activityTrack;
