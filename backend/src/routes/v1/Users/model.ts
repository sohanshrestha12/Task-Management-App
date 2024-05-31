import mongoose,{Document} from "mongoose";
import bcrypt from 'bcrypt';
import { UserRoles } from "../../../enums/User-role.enum";


export interface User {
  username: string;
  email: string;
  password: string;
  role?: string;
  isVerified?: boolean;
}

export const userPrivateFields = ['password','__v','createdAt','updatedAt'];

export interface UserDocument extends Document,User{
  _id:mongoose.Types.ObjectId;
    comparePassword(candidatePassword:string):Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    username: {
      type: String,
      required: [true, "Username is Required"],
      unique: false,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      unique: false,
    },
    role: {
      type: String,
      enum:Object.values(UserRoles),
      required: false,
      default:UserRoles.USER
    },
    isVerified: {
      type: Boolean,
      required: false,
      default:false
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<UserDocument>('save',async function (next){
    if(!this.isModified('password')){
        return next();
    }
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
    }catch(err){
        if(err instanceof Error) next(err);
    }
});

userSchema.methods.comparePassword = async function(candidatePassword:string){
    if(!this.password) console.log('Invalid Password or Email',401);
    return await bcrypt.compare(candidatePassword,this.password);
}

export const UserModel = mongoose.model<UserDocument>('user',userSchema);
