import mongoose, { Schema } from "mongoose";
import ErrorHandler from "../middelewares/error.js";

const bloggerSchema=new mongoose.Schema({
    titel:
    {
        type: String,
        required: true
    },
    description:
    
    {
        type: String,
    required: true
    },
    image:
    {
        type: String,
    required: true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require:true
    }
   
},{timestamps:true})
export const blogeModel=mongoose.model('blogge',bloggerSchema);
