import mongoose from "mongoose";
import { TaskPriority } from "../../../enums/Task-priority.enum";
import { TaskStatus } from "../../../enums/Task-status.enum";

export interface Task{
  _id?:string
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
    ref:'tag',
    required:false,
  }],
  isDeleted:{
    type:Boolean,
    default:false,
  },
  dueDate:{
    type:Date,
    required:true,
    unique:false
  },

},{
    timestamps:true,
});

export const TaskModel = mongoose.model<Task>("task", TaskSchema);


