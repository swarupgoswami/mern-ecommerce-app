import express from "express";
import {createuser , loginUser, logoutUser ,getallUser, getspecifiedUser, updateUser} from "../controllers/userController.js"
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";

const router=express.Router()

// router.route("/").post(createuser);
// import mongoose from "mongoose";
router.route("/").post(createuser).get(authenticate,authorizeAdmin, getallUser )
router.post("/auth",loginUser)
router.post("/logout",logoutUser)
router.route("/profile").get(authenticate,getspecifiedUser).put(authenticate,updateUser)

export default router;











 
