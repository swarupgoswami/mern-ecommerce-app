import express from "express";
const router=express.Router();
import { createcategory ,
    updateCategory,
    removeCategory,
    listCategory
} from "../controllers/categorycontroller.js";

import { authenticate , authorizeAdmin } from "../middleware/authMiddleware.js";

router.route('/').post(authenticate,authorizeAdmin,createcategory);
router.route("/:categoryId").put(authenticate,authorizeAdmin,updateCategory);
router.route('/:categoryId').delete(authenticate,authorizeAdmin,removeCategory);
router.route("/category").get(listCategory);


export default router;