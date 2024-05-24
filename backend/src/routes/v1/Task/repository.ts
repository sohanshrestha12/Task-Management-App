import mongoose from "mongoose";
import { Task, TaskModel } from "./model";

export const createTask =(data:Task,userId:string):Promise<Task>=>{
    const task = new TaskModel({...data,assigner:userId});
    return task.save();
}
export const getTaskById = (id:string):Promise<Task | null>=>{
    return TaskModel.findById(id);
}

export const addCommentToTask = (taskID: string, commentId: string) => {
  return TaskModel.findOneAndUpdate(
    { _id: taskID },
    {
      $push: {
        comments: new mongoose.Types.ObjectId(commentId),
      },
    }
  );
};  

export const addTagsToTask =(taskId:string,tagId:string)=>{
  return TaskModel.findOneAndUpdate(
    {_id:taskId},
    {
      $push:{
        tags: new mongoose.Types.ObjectId(tagId),
      },
    }
  );
}
export const removeCommentFromTask = (id: string, taskID: string) => {
  return TaskModel.findByIdAndUpdate(
    taskID,
    {
      $pull: { comments: id },
    },
    { new: true }
  );
};
export const removeTagFromTask = (id: string, taskID: string) => {
  return TaskModel.findByIdAndUpdate(
    taskID,
    {
      $pull: { tags: id },
    },
    { new: true }
  );
};