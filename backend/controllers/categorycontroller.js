import asyncHandler from "../middleware/asyncHandler.js";
import category from "../models/categoryModel.js";


const createcategory=asyncHandler( async (req,res)=>{
    try {
        const {name}=req.body;
        // console.log(name);
        if(!name){
            return res.json({error:"name is required"});
        }

        const existingCategory=await category.findOne({name});


        if(existingCategory){
            return res.json({error:"category alreday exist"});
        }

        try {
            const Newcategory=await category.create({name});
            return res.status(201).json(Newcategory);
        } catch (error) {
            console.log(error);
            
        }


        
    } catch (error) {
        console.log(error);
        return res.staus(400).json(error)
        
    }
});

const updateCategory=asyncHandler(async(req,res)=>{
    try {
        const {name}=req.body;
        const {categoryId}=req.params;

        const categoryToUpdate=await category.findOne({_id:categoryId});

        if(!categoryToUpdate){
            return res.status(404).json({error:"category not found"});


        }
        categoryToUpdate.name= name;
        const updatedcategory= await categoryToUpdate.save();
        res.json(updatedcategory);
        
        
        


        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal error"});
        
    }
})
const removeCategory=asyncHandler(async(req,res)=>{
    const {name}=req.body;
    const {categoryId}=req.params;
    try {
        const removed=await category.findByIdAndDelete(req.params.categoryId);
        res.json(removed);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal error"});
        
    }
})

const listCategory=asyncHandler(async(req,res)=>{
    try {
        
        const listed=await category.find({});
        res.json(listed);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal error"});f
        
    }
})

export{createcategory , 
    updateCategory,
removeCategory,
listCategory};



