import { Router } from "express";
import TaskController from "./controller";
import requireUser from "../../../Middleware/requireUser";

const TaskRouter = Router();

TaskRouter.route('/').post(requireUser,TaskController.createTask);
TaskRouter.route('/').get(requireUser,TaskController.getAllTask);
TaskRouter.route('/:id').get(requireUser,TaskController.getTaskById);
TaskRouter.route('/:id').delete(requireUser,TaskController.deleteTask);

export default TaskRouter;