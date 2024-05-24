import { Router } from "express";
import UserController from "./controller";

const UserRouter = Router();

UserRouter.route('/').post(UserController.createUser);
UserRouter.route('/verifyOtp/:id/:code').post(UserController.verifyOtp);
UserRouter.route('/resendOtp/:id').post(UserController.resendOtp);

export default UserRouter;