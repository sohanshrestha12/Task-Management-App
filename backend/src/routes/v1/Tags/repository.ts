import {TagModel, Tags} from './models';
export const createTags=async(data:Tags,userId:string)=>{
    const tag = new TagModel({...data,initiator:userId});
    return tag.save();
}

export const getTag=(id:string):Promise<Tags|null>=>{
    return TagModel.findById(id);
} 

export const editTag = (body:Partial<Tags>,id:string,userId:string)=>{
     const { _id, initiator, ...updateData } = body;
     return TagModel.findOneAndUpdate(
       { _id: id, initiator: userId },
       updateData,
       {
         new: true,
       }
     );
}
export const removeTag = (
  id: string,
  user: string
): Promise<Tags | null> => {
  return TagModel.findOneAndDelete({ _id: id, initiator: user });
};