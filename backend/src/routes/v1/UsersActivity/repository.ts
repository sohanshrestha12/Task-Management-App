import { UsersActivityModel } from "./models"

export const getAllUserActivity=(id:string)=>{
    return UsersActivityModel.find({userId:id}).populate({path:'userId',select:'-password -__v '});
}