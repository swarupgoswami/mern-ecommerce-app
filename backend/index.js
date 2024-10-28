// importing the packages and the utils
import path from "path"
import express from "express"
import dotenv from "dotenv"
import cp from "cookie-parser"



// import dbconnection from "./config/db"
import cookieParser from "cookie-parser"
import connectionDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"

dotenv.config()
const port=process.env.PORT || 5000;

connectionDB()
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



// app.get("/",(req,res)=>{
//     res.send("hello");
// })

app.use("/api/users",userRoutes);



app.listen(port,()=>{
    console.log("server working");
})