import { User, UserDocument, UserModel } from "./model";

type UserWithoutPassword = Omit<UserDocument,'password'>;

export const createUserRepo = (userData:User):Promise<UserWithoutPassword>=>{
    const user = new UserModel(userData);
    return user.save().then(savedUser => {
        const {password,...details} = savedUser.toObject();
        return details as UserWithoutPassword;
    });
};

export const getUserById=(id:string):Promise<UserDocument | null>=>{
    return UserModel.findById(id).select("-password");
}

export const updateUserVerification = (id:string):Promise<UserDocument | null>=>{
    return UserModel.findOneAndUpdate({_id:id},{isVerified:true},{new:true}).select("-password");
}

export const getUserByEmail = (email:string):Promise<UserDocument | null> =>{
    return UserModel.findOne({email:email}).select('-password');
}

export const getAllAssignee = ():Promise<UserDocument[] | null> =>{
    return UserModel.find({role:"USER"}).select('-password');
}

export const changeStatusColor = (id:string,color:string,field:string):Promise<UserDocument | null> => {
    let updateField = {}
    switch (field) {
      case "TODO":
        updateField = { todoColor: "#"+color };
        break;
      case "INPROGRESS":
        updateField = { inProgressColor: "#"+color };
        break;
      case "TESTING":
        updateField = { testingColor: "#"+color };
        break;
      case "COMPLETED":
        updateField = { completedColor: "#"+color };
        break;
    }
    return UserModel.findByIdAndUpdate({_id:id},updateField,{new:true});
}