import { UsersActivityModel } from "./models"

export const getAllUserActivity=()=>{
    return UsersActivityModel.find().populate({path:'userId',select:'-password -__v '});
}