import mongoose from "mongoose";

export const dbconnection=async()=>
{
  
await mongoose.connect(process.env.monogo_Url,{dbName:"PublicBloog"})

}
dbconnection().then((c)=>
{
    console.log("database connected sucessfully")
}).catch(err=>console.log(err));