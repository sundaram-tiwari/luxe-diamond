import Category from "../models/category.model";
import { asyncHandler } from "../utils/asyncHandler";

const getCategory = asyncHandler(async (req,res) => {
    const category = await Category.find({});
    if(!category){
        res.status(404).json({
            success: false,
            message: "Categories not found"
        })
    }

    res.status(200).json({
        success: true,
        message: "Categories fetched successfully",
        data : {
            category
        }
    })
});

module.exports = {getCategory}