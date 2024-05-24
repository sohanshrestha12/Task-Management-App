import { Router } from "express";
import TaskController from "./controller";
import requireUser from "../../../Middleware/requireUser";

const TaskRouter = Router();

TaskRouter.route('/').post(requireUser,TaskController.createTask);

export default TaskRouter;