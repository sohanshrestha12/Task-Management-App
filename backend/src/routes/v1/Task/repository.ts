import mongoose from "mongoose";
import { Task, TaskModel } from "./model";

export const createTask = async (data: Task, userId: string): Promise<Task> => {
  const task = new TaskModel({ ...data, assigner: userId });
  const newTask = await task.save();
  await newTask.populate("tags");
  await newTask.populate("assignee");
  return newTask;
};
export const getTaskById = (id: string): Promise<Task | null> => {
  return TaskModel.findById(id);
};

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

export const addTagsToTask = (taskId: string, tagId: string) => {
  return TaskModel.findOneAndUpdate(
    { _id: taskId },
    {
      $push: {
        tags: new mongoose.Types.ObjectId(tagId),
      },
    }
  );
};
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

export const getAllTask = (): Promise<Task[]> => {
  return TaskModel.find().populate("assignee").populate("tags");
};

export const deleteTask = (
  id: string,
  userId: string
): Promise<Task | null> => {
  return TaskModel.findOneAndDelete(
    { _id: id, assigner: userId },
    { new: true }
  );
};

export const BulkDelete=(data:Task[]) => {
  const idsToDelete = data.map((task) => task._id);
  return TaskModel.deleteMany({ _id: { $in: idsToDelete } });
}

export const updateTask = (data:Task,id:string)=>{
  return TaskModel.findByIdAndUpdate(id,data,{new:true}).populate("assignee").populate("tags");
}

export const getAssignedTasks = (id:string)=>{
  return TaskModel.find({assignee:id}).populate('assignee').populate('tags');
}
export const getAssignedTStatus = (type: string,id:string) => {
  return TaskModel.find({ assignee: id,status:type }).populate("assignee").populate("tags");
};
export const updateStatus = (id: string, status: string) => {
  return TaskModel.findByIdAndUpdate({_id:id},{status:status},{new:true});
};