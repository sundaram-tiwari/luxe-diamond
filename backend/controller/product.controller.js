const { asyncHandler } = require('../utils/asyncHandler');
const Product = require('../models/product.model');
const Category = require('../models/category.model');
const { importProducts } = require('../utils/importProductHandler');

const uploadProducts = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No file uploaded",
        });
    }

    const products = importProducts(req.file.path);

    if (!products) {
        return res.status(400).json({
            success: false,
            message: "Product insertion failed",
        });
    }

    return res.status(200).json({
        success: true,
        message: "Product inserted successfully",
        data: {
            products
        }
    });

});

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
        .populate("category", "name");

    if (!products) {
        return res.status(404).json({
            success: false,
            message: "No products found",
        });
    }


     res.status(200).json({
        success: true,
        message: "Product fetched successfully",
        data: {
            products
        }
    });
});

module.exports = { uploadProducts, getAllProducts };
