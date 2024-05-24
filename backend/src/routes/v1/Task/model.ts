import { TaskStatus } from "../../../enums/Status-priority.enum";
import { TaskPriority } from "../../../enums/Task-priority.enum";
import mongoose from "mongoose";

export interface Task{
    title:string,
    description:string,
    dueDate:Date,
    priority: string,
    status:string,
    assigner?:string,
    assignee?:[],
    comments?:[],
    tags?:[],
    isDeleted:boolean,
}

const TaskSchema = new mongoose.Schema<Task>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
  },
  priority: {
    type: String,
    enum:Object.values(TaskPriority),
    default:TaskPriority.LOW,
    required: true,
  },
  status: {
    type: String,
    enum:Object.values(TaskStatus),
    default:TaskStatus.TODO,
    required: true,
  },
  assigner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Assigner is Required"],
  },
  assignee:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:[true,"Assignee is Required"],
  }],
  comments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'comment',
    required:false,
  }],
  tags:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'tags',
    required:false,
  }],
  isDeleted:{
    type:Boolean,
    default:false,
  }
},{
    timestamps:true,
});

export const TaskModel = mongoose.model<Task>("task", TaskSchema);


