import mongoose from "mongoose"


const connectionDB= async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("CONNECTED TO THE DATABASE");
        
    } catch (error) {
        console.error(`error = ${error.message}`);
    }

}

export default connectionDB;