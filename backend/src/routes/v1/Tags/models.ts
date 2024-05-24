import mongoose from "mongoose";

export interface Tags{
    _id:string,
    title:string,
    description:string,
    color:string,
    initiator?: string,
}

const TagSchema = new mongoose.Schema<Tags>({
    title:{
        type:String,
        required:[true,"Title is required"],
        unique:false
    },
    description:{
        type:String,
        required:[true,"Description is required"],
        unique:false
    },
    color:{
        type:String,
        required:[true,'Color is required.'],
        unique:false
    },
    initiator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:[true,'Initiator is required.'],
        unique:false
    }
},{
    timestamps:true,
});

export const TagModel = mongoose.model<Tags>('tag',TagSchema);