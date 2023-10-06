import Jwt from "jsonwebtoken";

export const setCookie=(user,res,message,statusCode=200)=>
{

    const token=Jwt.sign({email:user.email},process.env.Secreate_key);

    res.status(statusCode);

    const  options = {
        expires:new Date(Date.now()+3*24*60*60*1000),
        httpOnly:true,
        sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
        secure:process.env.NODE_ENV==="Development"?false:true,
    }
   
   res.status(200).cookie("token",token,options).json({
        success:true,
        message,
        user
    })

}





