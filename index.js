import express,{urlencoded} from 'express';
import path from 'path';
import cookieParser from "cookie-parser";
import { config } from 'dotenv';
import cors from 'cors';
import { router } from './routs/user.js';
import * as modelRouter from './routs/blogge.js';
import * as productRouter from './routs/product.js';
import { errorMiddleware } from './middelewares/error.js';


export const app=express();

config()



const corsConfig = {
    credentials: true,
    origin: true,
};
//middele ware

app.use(cors(corsConfig))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.json())
app.use(errorMiddleware);

//routes.

app.use("/api/vi/user",router)
app.use("/api/vi/blogges",modelRouter.router)
app.use("/api/vi/product",productRouter.router)
app.get("/",(req,res)=>
{
    res.send("jay shree ram")
})