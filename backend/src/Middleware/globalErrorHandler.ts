import {NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import CustomError, { errorHandler } from "../utils/Error";


const castErrorHandler = (error: mongoose.Error.CastError) => {
  const message = `Invalid value for: ${error.path}`;
  // let errors: { [key: string]: string } = {};
  // errors[error.path] = "Invalid value"; //an object [] used when dynamic content or contains special character.
  return new CustomError(message, 400);
};

const keyDuplicationError = (error: any) => {
  const message = `This ${Object.keys(error.keyPattern).join(", ")} already exists`;
  // const errors: { [key: string]: string } = {};
  // for (const key in error.keyPattern) {
  //   if (error.keyPattern.hasOwnProperty(key)) {
  //     errors[key] = `This ${key.toLowerCase()} already exists`;
  //   }
  // }
  return new CustomError(message, 400);
};

const validationErrorHandler = (error: mongoose.Error.ValidationError) => {
  const message = ` ${Object.values(error.errors)
    .map((el) => el.message)
    .join(", ")}`;
  // const validationsErrors: { [key: string]: string } = {};
  // Object.values(error.errors).forEach(
  //   (el) => (validationsErrors[el.path] = error.message)
  // );
  return new CustomError(message, 400);
};

const missingSchemaErrorHandler = (
  error: mongoose.Error.MissingSchemaError
) => {
  const message = ` Schema not registered for this model`;
  // const errors: { [key: string]: string } = {};
  // errors[error.name] = "Schema not registered for this model";
  return new CustomError(message, 500);
};


export const globalErrorHandler = (error:unknown,req:Request,res:Response,next:NextFunction)=>{
    let err:CustomError | null = null;
      if (
        typeof error === "object" &&
        error &&
        "code" in error &&
        error.code === 11000
      )
        err = keyDuplicationError(error);
      else if (error instanceof mongoose.Error.CastError)
        err = castErrorHandler(error);
      else if (error instanceof mongoose.Error.ValidationError)
        err = validationErrorHandler(error);
      else if (error instanceof mongoose.Error.MissingSchemaError)
        err = missingSchemaErrorHandler(error);

      if(err) errorHandler(res,err);
      else errorHandler(res,error);
}