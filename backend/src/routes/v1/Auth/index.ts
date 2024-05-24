import { Router } from "express";
import AuthController from "./controller";

const AuthRouter = Router();

AuthRouter.route('/login').post(AuthController.login);

export default AuthRouter;