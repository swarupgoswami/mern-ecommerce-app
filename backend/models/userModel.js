import mongoose from "mongoose";

const userschema=mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },

    password:{
        type:String,
        required:true,

    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false,
    }


},
{timestamps:true}
)

const userModel=mongoose.model('user',userschema);

export default userModel