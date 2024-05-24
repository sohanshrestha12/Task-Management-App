import { NextFunction, Request, Response } from "express";
import CustomError from "../../../utils/Error";
import { successResponse } from "../../../utils/HttpResponse";
import { User } from "./model";
import UserService from "./service";
import { findUserOtp } from "./otpVerification/repository";
const UserController = {
  async createUser(
    req: Request<unknown, unknown, User>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = req.body;
      if (!body.email || !body.password || !body.username) {
        throw new CustomError("All fields are required.", 400);
      }
      const result = await UserService.createUser(body);
      return successResponse({
        response: res,
        message: "User created successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async verifyOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, code } = req.params;
      const user = await UserService.getUserById(id);
      if (id != user._id.toString())
        throw new CustomError("No code with particular id is available", 404);
      const usersOtp = await findUserOtp(user._id.toString());
      if (code != usersOtp?.code)
        throw new CustomError("Invalid otp. Please try again.", 400);
      if (usersOtp.expiration.getTime() < Date.now()) {
        await UserService.deleteUserOtp(usersOtp._id.toString());
        throw new CustomError("Otp already expired!", 400);
      }
      const updatedUser = await UserService.updateUserVerification(id);
      return successResponse({
        response: res,
        message: "User Verification Successful",
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  },

  async resendOtp(req:Request,res:Response,next:NextFunction){
    const {id} = req.params;
    try {
      const result = await UserService.resendOtp(id);
       return successResponse({
         response: res,
         message: "Otp code sent successfully",
         data: result,
       });
    } catch (error) {
      next(error);
    }
  },
};

export default UserController;
