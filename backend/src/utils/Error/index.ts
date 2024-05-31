import { Response } from "express";
import { errorResponse } from "../../utils/HttpResponse";

export default class CustomError extends Error{
    statusCode: number;
    name:string;
    // errors?: Object;
    constructor(message:string,statusCode:number){
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name; // returns name of constructor function i.e:CustomError
        Error.captureStackTrace(this,this.constructor);
        // this.errors = errors;
    }
}

export const errorHandler = (res:Response,error:unknown)=>{
    console.log(error);
    if(error instanceof CustomError){
        errorResponse({
            response:res,
            message:error.message,
            status:error.statusCode,
            // data:error.errors
        })
    }else if(error instanceof Error){
        errorResponse({
            response:res,
            message:error.message,
            status:500,
        })
    }else{
        errorResponse({
            response:res,
            message:'Internal Server Error',
            status: 500,
        })
    }
}