import userModel from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import bcrypt from "bcrypt"
import token from "../utils/Token.js"
import generatetoken from "../utils/Token.js";

const createuser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    

    // Check whether the user has given all the details
    if (!username || !email || !password) {
        return res.status(400).send("All fields are required");
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(400).send("User already exists");
    }
    const salt=await bcrypt.genSalt(10);
    const hashpassword=await bcrypt.hash(password,salt);

    // Create the user
    const newUser = await userModel.create({
        username,
        email,
        password:hashpassword
    });
    token(res,newUser._id)

    // Respond with the created user (you may want to omit the password)
    // res.status(201).json(newUser);
    try {
        res.status(201).json({
            _id:newUser._id,
            name:newUser.username,
            email:newUser.email,
            password:newUser.password
        })
    } catch (error) {
        res.status(400);
        throw new Error("invalid user data");
        
    }
});


const loginUser = asyncHandler(async (req,res)=>{
    const {email,password}=req.body;
    const existingUser=await userModel.findOne({email});
    if(existingUser){
        const passwordVlaid=await bcrypt.compare(password,existingUser.password);
        
        // res.send(passwordVlaid);
        
        if(passwordVlaid){
            token(res,existingUser._id)
            // res.send("hello");  
            res.json({
                _id:existingUser._id,
                name:existingUser.username,
                email:existingUser.email,
                isAdmin:existingUser.isAdmin
            })
            return
        }
    }

})

const logoutUser = asyncHandler(async(req,res)=>{
    // res.send("hello");
    res.cookie("jwt","",{
        httpOnly:true,
        expires:new Date(0),

    })
    res.status(200).json({mesage:"logged successfully"});
})

const getallUser= asyncHandler(async(req,res)=>{
    const alluser = await userModel.find({})
    res.json(alluser);
})
const getspecifiedUser=asyncHandler(async(req,res)=>{
     const user= await userModel.findById(req.user._id)
     if(user){
        res.json({
            id:user._id,
            name:user.username,

        })
     }
     else{
        res.status(404).json({message:"user not found"});
     }
})

const updateUser =asyncHandler(async (req,res)=>{
    const user= await userModel.findById(req.user._id)

    if(user){
        user.username=req.body.username || user.username;

        user.email=req.body.email || user.email;
        // res.json({
        //     username:user.username,
        //     email:user.email
        // })
        if(req.body.password){
            // ;
            const salt=await bcrypt.genSalt(10);
            const hashpassword=await bcrypt.hash(req.body.password,salt);
            user.password=hashpassword;

            
        }
        await user.save(); 
        res.json({
            id:user._id,
            username: user.username,
            email: user.email

        })
    }
    else{
        res.status(404)
        throw new Error("user not found");
    }

})

const deletespecificUser=asyncHandler(async (req,res)=>{

    const user=await userModel.findById(req.params.id)

    if(user){
        if(user.isAdmin){
            res.status(400);
            throw new Error("user is admin");
        }
        await user.deleteOne({_id:user._id});
        res.json({message:"user removed"})
    }else{
        res.staus(404).json({message:"user doesnt exist"});
    }
})

const getuserbyId=asyncHandler(async(req,res)=>{
    const user= await userModel.findById(req.params.id).select("-password");
    if(user){
        res.json(user);
    }
    else{
        res.staus(404);
        throw new Error("user not found");
    }
})

export { createuser,loginUser,logoutUser, getallUser,getspecifiedUser, updateUser , deletespecificUser , getuserbyId };
