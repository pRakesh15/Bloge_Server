import mongoose from "mongoose";
import { productModel } from "../models/product.js";
import { Usermodel } from "../models/userm.js";



export const createProduct = async(req, res, next) => {
    try {
      
      const { titel, description, image,price } = req.body;
      const saveproduct = new productModel({
        titel,
        description,
        image,
        price,
        user: req.myUser._id,
      });
  
      const existingUser=await Usermodel.findById(req.myUser._id);
      if(!existingUser)
      {
        return res.status(404).json({
          sucess:false,
          message:"cant find the user"
        })
      }
      
      const secession=await mongoose.startSession();
      secession.startTransaction()
      let addproduct =await saveproduct.save();
  existingUser.Bloges.push(addproduct)
  await existingUser.save({secession})
  await secession.commitTransaction();
  
      
        return  res.status(201).json({
            success: true,
            message: "product added successfylly",
          });
       
      
    
    } catch (error) {
      next(error);
    }
  };
  
  //fetech all blogg
  
  export const getAllproduct = async (req, res, next) => {
    try {
      const products = await productModel.find().populate("user");
      if (!products) {
        res.status(200).json({
          success: false,
          message: "no bloge found",
        });
      } else {
        res.status(200).json({
          success: true,
          count: products.length,
          message: "product list",
          products,
        });
      }
    } catch (error) {
      next(error);
    }
  };
  