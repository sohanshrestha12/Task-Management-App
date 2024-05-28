import { Request, Response, NextFunction, CookieOptions } from "express";
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
      const { accessToken, refreshToken } = await AuthService.login(body);
      // const expiresInDays = 7; // Set expiration time to 7 days
      const expirationTimeInMinutes = 2;
      const expiryDate = new Date();
      // expiryDate.setDate(expiryDate.getDate() + expiresInDays);
      expiryDate.setTime(
        expiryDate.getTime() + expirationTimeInMinutes * 60 * 1000
      );
      const options: CookieOptions = {
        httpOnly: false,
        path: "/",
        sameSite: "lax",
        // expires:expiryDate
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

  async logout(
    req: Request<unknown, unknown, unknown>,
    res: Response,
    next: NextFunction
  ) {
    try {
      res.locals.user = null;
      res.cookie("accessToken", "", { expires: new Date(0) });
      res.cookie("refreshToken", "", { expires: new Date(0) });

      return successResponse({
        status: 200,
        response: res,
        message: "logout successful",
      });
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController;
