import { NextFunction, Request, Response } from "express";
import { getTaskById } from "../routes/v1/Task/repository";
import { UsersActivityModel } from "../routes/v1/UsersActivity/models";

const activityTrack =  async (action: string,req: Request, res: Response,next:NextFunction) => {
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
    } catch (error) {
      next(error);
    }
  };

export default activityTrack;
