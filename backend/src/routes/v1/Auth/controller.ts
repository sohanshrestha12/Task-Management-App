import { Request, Response, NextFunction } from "express";
import { Auth } from "./types";
import AuthService from "./service";
import { successResponse } from "../../../utils/HttpResponse";

const AuthController = {
  async login(
    req: Request<unknown, unknown, Auth>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = req.body;
      const { accessToken,refreshToken } = await AuthService.login(body);
      const options = {
        httpOnly: true,
        path: "/",
      };

      res
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options);
      return successResponse({
        status: 200,
        response: res,
        message: "Login Successful",
      });
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController;
