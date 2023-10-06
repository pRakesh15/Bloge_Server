import express  from "express";

import { isAuthanticate } from "../middelewares/IsAuth.js";
import { createBlogg, deleteBloge, getAllblogg, getMyblogg, updaeBlogg } from "../controler/bloggs.js";

export const router=express.Router();

router.post("/creat_blogg",isAuthanticate,createBlogg)
.get("/all-blogge",getAllblogg)
.get("/get-myblogge",isAuthanticate,getMyblogg)
router.put("/updateBlogges/:id",isAuthanticate,updaeBlogg)
.delete("/delete_mybloge/:id",isAuthanticate,deleteBloge)
