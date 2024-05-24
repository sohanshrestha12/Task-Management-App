import env from './src/config/env';
import { connectToDB } from './src/config/dbConnect';
import express from 'express';
import routes from './src/routes/v1/index';
import bodyParser from 'body-parser';
import { Request,Response } from 'express';
import { globalErrorHandler } from './src/Middleware/globalErrorHandler';
import { errorResponse } from './src/utils/HttpResponse';
import cors from 'cors';
import deSerializeUser from './src/Middleware/deSerializeUser';
(async ()=>{
    const app = express();
    app.use(bodyParser.json());
    app.use(cors({origin:'http://localhost:5173',credentials:true}));

    app.use(deSerializeUser);

    app.use('/api/v1',routes);

    app.all('*',(req:Request,res:Response)=>{
        errorResponse({
            response:res,
            message:"Path not found",
            status:404
        });
    });


    app.use(globalErrorHandler);

    app.listen(env.port,async()=>{
        await connectToDB();
        console.log(`http://localhost:${env.port}`);
    });

    process.on('SIGINT',()=>{
        console.log('Shutting down server gracefully...');
        process.exit();
    });

    process.on('unhandledRejection',(reason,promise)=>{
        console.log(JSON.stringify({message:`Unhandled Rejection at:,${promise}`,error:reason}));
    });

    process.on('uncaughtException',error => {
        console.log(JSON.stringify({message:`Uncaught Exception:,  ${error}`}));
    });

})();