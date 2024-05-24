import { Router } from "express";
import UserRouter from "./Users";
import AuthRouter from "./Auth";
import TaskRouter from "./Task";
import CommentsRouter from "./Comments";
import TagRouter from "./Tags";

const routes = Router();

routes.use('/users',UserRouter);
routes.use('/auth',AuthRouter);
routes.use('/tasks',TaskRouter);
routes.use('/tasks/:taskId/comment',CommentsRouter);
routes.use('/tagTasks/:taskId/tag',TagRouter);

export default routes;