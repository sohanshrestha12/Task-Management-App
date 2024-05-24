import mongoose, { Document } from "mongoose";

export interface Otp {
  code: string;
  user_id?: string;
  expiration:Date;
}

export interface OtpDocument extends Otp, Document {
    _id:mongoose.Types.ObjectId;
}
const otpSchema = new mongoose.Schema<OtpDocument>({
    code:{
        type:String,
        required:[true,'Otp is Required'],
        unique: true,
    },
    expiration:{type:Date},
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:[true,'User is Required'],
        unique:true,
    },
});
export const OtpModel = mongoose.model<OtpDocument>('otp',otpSchema);

