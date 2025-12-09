import express  from "express";

import { isAuthanticate } from "../middelewares/IsAuth.js";
import { createProduct,getAllproduct } from "../controler/product.js";

export const router=express.Router();

router.post("/creat_product",isAuthanticate,createProduct)
.get("/all-product",getAllproduct)

