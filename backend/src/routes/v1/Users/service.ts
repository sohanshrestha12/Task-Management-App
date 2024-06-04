import CustomError from "../../../utils/Error";
import { sendVerificationEmail } from "../../../utils/OtpVerification";
import { User } from "./model";
import { deleteOtp, storeUserOtp } from "./otpVerification/repository";
import {
  changeStatusColor,
  createUserRepo,
  getAllAssignee,
  getUserByEmail,
  getUserById,
  updateUserVerification,
} from "./repository";
import otpGenerator from "otp-generator";

function generateOtp() {
  return otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
}
const UserService = {
  async createUser(userData: User) {
    const otp = generateOtp();
    const user = await createUserRepo(userData);
    sendVerificationEmail(user.email, otp);
    const otpDetails = await storeUserOtp(otp, user._id.toString());
    return { user, otpDetails };
  },
  async resendOtp(id: string) {
    const otp = generateOtp();
    const user = await this.getUserById(id);
    sendVerificationEmail(user.email, otp);
    const otpDetails = await storeUserOtp(otp,user._id.toString());
    return {user,otpDetails};

  },

  async getUserById(id: string) {
    const user = await getUserById(id);
    if (!user) throw new CustomError("User not found", 404);
    return user;
  },
  async updateUserVerification(id: string) {
    await this.getUserById(id);
    return await updateUserVerification(id);
  },
  async deleteUserOtp(id: string) {
    const deletedOtp = await deleteOtp(id);
    if (!deletedOtp)
      throw new CustomError("The Otp to be deleted not found", 404);
    return deletedOtp;
  },
  async getAllAssignee(){
    return await getAllAssignee();
  },
  async getUnverifiedUserByEmail(email:string){
    const user = await getUserByEmail(email);
    if(!user){
      throw new CustomError("Invalid Email",403);
    }
    return user;
  },
  async changeStatusColor(id:string,color:string,field:string){
    await this.getUserById(id);
    
    return changeStatusColor(id,color,field);
  }
};
export default UserService;
