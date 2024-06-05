import mongoose from "mongoose";

export interface UsersActivity{
    _id?:string;
    userId?:string;
    action:string;
    title?:string;
}

const UsersActivitySchema = new mongoose.Schema<UsersActivity>({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"User is required"]
    },
    action:{
        type:String,required:true,
    },
    title:{
        type:String,
        required:false
    }

},{timestamps:true});

export const UsersActivityModel = mongoose.model<UsersActivity>("UsersActivity",UsersActivitySchema);

