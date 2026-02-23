const csv = require("csvtojson");
const mongoose = require("mongoose");
const slugify = require("slugify");
const Product = require("../models/product.model");
const { connectDatabase } = require("../config/dbConnect");

require("dotenv").config();

const CSV_FILE_PATH = "./data/csv/products.csv";

const importProducts = async () => {
    try {
        await connectDatabase();

        await Product.deleteMany();
        console.log("Old products deleted.");

        const categoriesMap = {
            1: "699564356c79459a04d32f26",
            2: "699564356c79459a04d32f27",
            3: "699564356c79459a04d32f28",
            4: "699564356c79459a04d32f29",
            5: "699564356c79459a04d32f2a",
            6: "699564356c79459a04d32f2b",
        };

        const subCategoriesMap = {
            1: "699ca642f5b0ce8735a558bc",
            2: "699ca642f5b0ce8735a558bd",
            3: "699ca642f5b0ce8735a558be",
            4: "699ca642f5b0ce8735a558bf",
            5: "699ca642f5b0ce8735a558c0",
            6: "699ca642f5b0ce8735a558c1",
            7: "699ca642f5b0ce8735a558c2",
            8: "699ca642f5b0ce8735a558c3",
            9: "699ca642f5b0ce8735a558c4",
            10: "699ca642f5b0ce8735a558c5",
            11: "699ca642f5b0ce8735a558c6",
            12: "699ca642f5b0ce8735a558c7",
        };

        const rows = await csv({
            trim: true,
        }).fromFile(CSV_FILE_PATH);

        const formattedData = rows.map((row) => {
            const oldCategoryId = parseInt(row.category_id);
            const oldSubCategoryId =
                row.sub_category_id === "NULL" ? null : parseInt(row.sub_category_id);

            const mappedCategoryId = categoriesMap[oldCategoryId];

            if (!mappedCategoryId) {
                console.log("Invalid categoryId:", oldCategoryId);
                return null;
            }

            const mappedSubCategoryId = oldSubCategoryId
                ? subCategoriesMap[oldSubCategoryId]
                : null;

            let diamondData = {};
            if (row.diamond && row.diamond !== "NULL") {
                try {
                    const parsedDiamond = JSON.parse(row.diamond);
                    diamondData = {
                        carat: parsedDiamond[0]?.carat || 0,
                        quantity: parsedDiamond[0]?.quantity || 0,
                        shape: parsedDiamond[0]?.shape || "",
                    };
                } catch (err) {
                    console.log("Diamond parse error:", err.message);
                }
            }

            return {
                category: new mongoose.Types.ObjectId(mappedCategoryId),
                subCategory: mappedSubCategoryId
                    ? new mongoose.Types.ObjectId(mappedSubCategoryId)
                    : null,

                productSku: row.product_sku?.toUpperCase(),

                name: row.name,
                description: row.description,

                slug: slugify(row.name, { lower: true }),

                material: row.material || "Gold",

                diamond: diamondData,

                goldWeight22k: Number(row.gold_weight_22k) || 0,
                goldWeight18k: Number(row.gold_weight_18k) || 0,
                goldWeight14k: Number(row.gold_weight_14k) || 0,

                quantity: Number(row.quantity) || 1,

                color: row.color ? row.color.split(",") : [],

                video: row.default_video || "yellow",
                defaultColor: row.default_color,
                defaultVideo: row.default_video,

                isRecommended: row.is_recommended == "1",
                isMostSelling: row.is_most_selling == "1",

                productBasePrice: Number(row.product_base_price) || 0,
                productBuyPrice: Number(row.product_buy_price) || 0,
                discount: Number(row.discount) || 0,

                status: row.status == "1",

                totalReviews: Number(row.total_reviews) || 0,
                averageRating: Number(row.avg_rating) || 0,
            };
        }).filter(Boolean);

        await Product.insertMany(formattedData, { ordered: false });

        console.log("Products inserted successfully.");
        process.exit();

    } catch (error) {
        console.error("Import Failed:", error);
        process.exit(1);
    }
};

importProducts();