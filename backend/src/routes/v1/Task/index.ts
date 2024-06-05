import { Router } from "express";
import requireUser from "../../../Middleware/requireUser";
import TaskController from "./controller";
import activityTrack from "../../../Middleware/activityTrack";

const TaskRouter = Router();

TaskRouter.route("/").post(requireUser,activityTrack('Created a new Task'), TaskController.createTask);
TaskRouter.route("/getAssignedTasks").get(requireUser,TaskController.getAssignedTasks);
TaskRouter.route("/getAllTodos").get(requireUser, TaskController.getAllStatus);
TaskRouter.route("/").get(requireUser, TaskController.getAllTask);
TaskRouter.route("/:id").get(requireUser, TaskController.getTaskById);
TaskRouter.route("/:id").delete(requireUser, TaskController.deleteTask);
TaskRouter.route("/:id").patch(requireUser,activityTrack('Updated Task'), TaskController.updateTask);
TaskRouter.route("/").delete(requireUser, TaskController.BulkDelete);
TaskRouter.route("/getAssignerTasks/:id").get(
  requireUser,
  TaskController.getAssignerTasks
);
TaskRouter.route("/updateStatus/:id/:status").post(
  requireUser,
  activityTrack("Changed Task Status"),
  TaskController.updateStatus
);


export default TaskRouter;
