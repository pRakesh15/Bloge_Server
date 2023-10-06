import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ErrorHandler from "../middelewares/error.js";
import {  setCookie } from "../utils/SetCooki.js";
import { Usermodel } from "../models/userm.js";
import { json } from "express";

const user = Usermodel;

//create user
export const createUser = async (req,res,next) => {
  try {
    const { username, email, password, city } = req.body;

    let User = await user.findOne({ email });
  if(!User)
  {
    const hasedPassword = await bcrypt.hash(password, 10);
    User = await user.create({
      username,
      email,
      password: hasedPassword,
      city,
    });
    setCookie(User, res, "Registered Successfully!!", 201);

  }
  else
    {
      return res.status(404).json
      ({
        success:false,
        message:"User is alrady exist !!"
      });
    } 

  
    
  } catch (error) {
    next(error);
  }
};

//login Uuser

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const User = await user.findOne({ email }).select("+password");
    if (!User) return res.status(404).json
    ({
      success:false,
      message:"Invalid email or password"
    });
    
  
    const matchUser = await bcrypt.compare(password, User.password);
    if (!matchUser) return  res.status(404).json
    ({
      success:false,
      message:"Invalid email or password"
    });
    setCookie(User, res, `Welcome back , ${User.username}`, 200);
    
  } catch (error) {
    next(error);
  }
};


//get My profile
export const getMyprofile = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      User: req.myUser,
    });
  } catch (error) {
    next(
      res.status(404).json({
        success: false,
        message: "internal server error",
      })
    );
  }
};

//updateUser's password

// export const updateUser=async(req,res,next)=>
// {
// try {
//     let AvableUser=await user.findOne({email:req.body.email});
//     if(!AvableUser)
//     {
//         res.status(404).json({
//             success:false,
//             message:"Entered user is not exist"
//           })

//     }
//     else
//     {
//         const newPassword=bcrypt.hashSync(req.body.password,10);
//         AvableUser.password=newPassword;
//         await AvableUser.save();

//          res.status(200).json({
//              success:true,
//              message:"passsword Upadted sucessfully"
//          })

//     }
// } catch (error) {
//     next(res.status(404).json({
//         success:false,
//         message:"failed to update password"
//       }))
// }
// }

//logoutUser

export const logoutUser = (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Developement" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "logedout Sucessfully",
    });
};
