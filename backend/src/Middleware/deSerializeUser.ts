import { Request,Response,NextFunction } from "express";
import { verifyJwt } from "../utils/Jwt";
const deSerializeUser = async(req:Request,res:Response,next:NextFunction) =>{
    const accessToken = (req.headers.authorization || '').replace(/^Bearer\s/,'');
    if(!accessToken){
        return next();
    }
    
    const decodedToken = verifyJwt(accessToken,'accessToken');
   
    if(decodedToken){
        res.locals.user = decodedToken;
    }
    return next();
} 
export default deSerializeUser;