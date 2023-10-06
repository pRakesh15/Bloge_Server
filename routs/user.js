import express from "express"
import { createUser, getMyprofile, loginUser, logoutUser } from "../controler/user.js";

import { isAuthanticate } from "../middelewares/IsAuth.js";

export const router=express.Router();
router.post("/create-user",createUser)
.post("/login-user",loginUser)
.get("/logout-user",isAuthanticate,logoutUser)
.get("/getMyprofile",isAuthanticate,getMyprofile)
// router.put("/updatePassword",updateUser)
