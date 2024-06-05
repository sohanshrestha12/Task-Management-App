import requireUser from "../../../Middleware/requireUser";
import { Router } from "express";
import UsersActivityController from "./controller";

const UsersActivityRouter = Router();


UsersActivityRouter.route('/').get(requireUser,UsersActivityController.getAllUserActivity)


export default UsersActivityRouter;