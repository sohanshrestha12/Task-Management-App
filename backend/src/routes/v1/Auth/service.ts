import { signJwt } from "../../../utils/Jwt";
import CustomError from "../../../utils/Error";
import { getUserByEmail, getUserById } from "../Users/repository";
import { Auth } from "./types";
import { omit } from "../../../utils";
import { userPrivateFields } from "../Users/model";

const AuthService = {
  async login(data: Auth) {
    const user = await getUserByEmail(data.email);
    if (!user) throw new CustomError("Invalid user credentials", 401);
    
    
    if(!user.isVerified) {
      throw new CustomError("Not verified Yet",403)
    };
   
    
    const isValid = await user.comparePassword(data.password);
    if (!isValid) throw new CustomError("Invalid user credentials", 401);
    const accessToken = signJwt(
      omit(user.toJSON(), userPrivateFields),
      "accessToken",
      { expiresIn: "7d" }
    );
    const refreshToken = signJwt(
      { userId: user._id.toString() },
      "refreshToken",
      { expiresIn: "30d" }
    );

    return { accessToken, refreshToken };
  },
  async generateAccessReferenceToken(userId: string) {
    const user = await getUserById(userId);
    if (!user) throw new CustomError('Token Expired', 401);

    const newAccessToken = signJwt(
      omit(user.toJSON(), userPrivateFields),
      "accessToken",
      { expiresIn: "7d" }
    );
    return newAccessToken;
  },
};

export default AuthService;
