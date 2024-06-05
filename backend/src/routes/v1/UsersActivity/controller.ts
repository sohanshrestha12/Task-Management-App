import { NextFunction, Request, Response } from "express"
import UsersActivityService from "./service";
import { successResponse } from "../../../utils/HttpResponse";

const UsersActivityController = {
    async getAllUserActivity(req:Request,res:Response,next:NextFunction){
        const id = res.locals.user._id;
        const activityLog = (await UsersActivityService.getAllUserActivity(id));
        const latestActivities = activityLog.reverse().slice(0, 10);
         return successResponse({
           response: res,
           message: "Users Activity Logs successfully",
           data: latestActivities,
         });
    },
}

export default UsersActivityController