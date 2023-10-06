import mongoose, { Schema } from "mongoose";
const userSchema=new mongoose.Schema({
username:
{
    type:String,
    required:[true,'user is requred']
},
email:
{
    type:String,
    required:[true,'email is requred']
},
password:
{
    type:String,
    required:true,
    select: false,
},
city:
{
    type:String,
    required:true
},
profilePicture:
{
    data: Buffer,
        contentType: String
},
token:{
    type:String,
},

Bloges:[{type:Schema.Types.ObjectId, ref:'blogge'}],

},{timestamps:true})

export const Usermodel=mongoose.model('User',userSchema);