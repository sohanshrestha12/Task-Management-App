import mongoose from "mongoose";
import env from "./env";

export const connectToDB = async ()=>{
    const connectionUrl = env.mongoDbUrlConnection;
    if(connectionUrl){
        try {
            await mongoose.connect(connectionUrl);
            console.log('Connected to database successfully.')
        } catch (error) {
            console.log(error);
        }
    }else{
        console.log('Please provide MongoDB Connection URL');
    }
}