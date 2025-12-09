import mongoose from "mongoose";
import { blogeModel } from "../models/bloggem.js";
import { Usermodel } from "../models/userm.js";

//create bloge

export const createBlogg = async(req, res, next) => {
  try {
    
    const { titel, description, image } = req.body;
    const saveBlogg = new blogeModel({
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
    let addblogg =await saveBlogg.save();
existingUser.Bloges.push(addblogg)
await existingUser.save({secession})
await secession.commitTransaction();

    
      return  res.status(201).json({
          success: true,
          message: "blogg added successfylly",
        });
     
    
  
  } catch (error) {
    next(error);
  }
};

//fetech all blogg

export const getAllblogg = async (req, res, next) => {
  try {
    const allBlogs = await blogeModel.find().populate("user");
    if (!allBlogs) {
      res.status(200).json({
        success: false,
        message: "no bloge found",
      });
    } else {
      res.status(200).json({
        success: true,
        count: allBlogs.length,
        message: "bloge list",
        allBlogs,
      });
    }
  } catch (error) {
    next(error);
  }
};

//fetech my bloge

export const getMyblogg = async (req, res, next) => {
  try {
    const myId = req.myUser._id;
    const myBlogs = await blogeModel.find({ user : myId });

    if (!myBlogs) {
      res.status(200).json({
        success: false,
        message: "no bloge found",
      });
    } else {
      res.status(200).json({
        success: true,
        count: myBlogs.length,
        message: "bloge list",
        myBlogs,
      });
    }
  } catch (error) {
    next(error);
  }
};


//update bloge

export const updaeBlogg = async(req, res, next) => {
try {

    const {id}=req.params
    const {titel,description,image}=req.body

    const upbloge=await blogeModel.findByIdAndUpdate(id,{...req.body},{new:true});

    let promise=new Promise((resolve,reject)=>
    {
        resolve(upbloge);
    })
promise.then((value)=>
{
    res.status(200).json({
        sucess:true,
        message:" bloge update sucessfully",
        upbloge

    })
}).catch((error)=>
{
    res.status(404).json({
        success:false,
        message:"unable to update bloge"
    })
})
    
} catch (error) {
    next(error)
}
};


//delete bloge
export const deleteBloge = async (req, res, next) => {
  try {
    let bloge = await blogeModel.findByIdAndDelete(req.params.id).populate('user');
    await bloge.user.Bloges.pull(bloge)
    await bloge.user.save()
    if (!bloge) {
      res.status(404).json({
        sucess: false,
        message: "cant find the item",
      });
    }
    const pr = new Promise((resolve, reject) => {
      resolve(bloge);
    });
    pr.then((value) => {
      res.status(200).json({
        success: true,
        message: "task deleted",
      });
    }).catch((error) => {
      console.log(error);
    });
  } catch (error) {
    next(error);
  }
};
