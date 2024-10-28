import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async(req,res,next)=>{
    let token=req.cookies.jwt;

    if(token){
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user=await userModel.findById(decoded.userId).select("-password");
            console.log(req.user);
            console.log(decoded.userId);
            next() 
        } catch (error) {
            res.status(400)
            throw new Error("not authorized token failed")
            
        }
    }else{
        res.status(401)
        throw new Error("not authorized no token") 
    }
});


const authorizeAdmin =(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401).json({message:"not authorized"});
    }
}

export{authenticate , authorizeAdmin} 