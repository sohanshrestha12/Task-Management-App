import { Router } from "express";
import UserController from "./controller";
import requireUser from "../../../Middleware/requireUser";

const UserRouter = Router();

UserRouter.route('/').post(UserController.createUser);
UserRouter.route('/verifyOtp/:id/:code').post(UserController.verifyOtp);
UserRouter.route('/resendOtp/:id').post(UserController.resendOtp);
UserRouter.route("/changeColor/:field/:color").patch(
  requireUser,
  UserController.changeStatusColor
);

UserRouter.route('/getUnverifiedUser/:email').post(UserController.getUnverifiedUser);
UserRouter.route('/getCurrentUser').get(requireUser, UserController.getCurrentUser);
UserRouter.route('/getAllAssignee').get(requireUser,UserController.getAllAssignee);
UserRouter.route('/:id').get(UserController.getUserById);

export default UserRouter;