import { NextFunction, Request, Response } from "express"
import UsersActivityService from "./service";
import { successResponse } from "../../../utils/HttpResponse";

const UsersActivityController = {
    async getAllUserActivity(req:Request,res:Response,next:NextFunction){
        const id = res.locals.user._id;
        const activityLog = (await UsersActivityService.getAllUserActivity(id)).reverse();
         return successResponse({
           response: res,
           message: "Users Activity Logs successfully",
           data: activityLog,
         });
    },
}

export default UsersActivityController