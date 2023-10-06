import { Usermodel } from "../models/userm.js";
import Jwt from "jsonwebtoken";

let myUser = Usermodel;

export const isAuthanticate =async (req, res, next) => {
  const {token} = req.cookies;

  if (!token) {
    return res.status(500).json({
      success: false,
      message: "login first",
    });
  }
  else
  {
    const decoded=Jwt.verify(token,process.env.Secreate_key);
    req.myUser=await myUser.findOne({email:decoded.email});
    next();
  }
};
