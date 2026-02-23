const { asyncHandler } = require('../utils/asyncHandler');
const Product = require('../models/product.model');
const fs = require("fs");
const csv = require("csv-parser");

const uploadProducts = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No file uploaded",
        });
    }

    const results = [];
    const filePath = req.file.path;

    fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => {
            results.push(data);
            console.log(data)
        })
        .on("end", async () => {
            try {
                await Product.insertMany(results);

                return res.status(200).json({
                    success: true,
                    message: "Products uploaded successfully",
                    count: results.length,
                });
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "Database insertion failed",
                    error: error.message,
                });
            }
        });
});

module.exports = { uploadProducts };
