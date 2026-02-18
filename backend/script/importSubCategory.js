const csv = require('csvtojson');
const subCategory = require('../models/subCategory.model');
const { connectDatabase } = require('../config/dbConnect');

require('dotenv').config();

const CSV_FILE_PATH = './data/csv/sub_category.csv';

const inportSubCategory = async () => {
    try {
        await connectDatabase();

        await subCategory.deleteMany();
        console.log("Old subcategory deleted.");

        const categoriesMap = {
            1: "699564356c79459a04d32f26",
            2: "699564356c79459a04d32f27",
            3: "699564356c79459a04d32f28",
            4: "699564356c79459a04d32f29",
            5: "699564356c79459a04d32f2a",
            6: "699564356c79459a04d32f2b",
        }

        const rows = await csv({
            noheader: true,
            headers: ["id", "categoryId", "name", "createdAt", "updatedAt"],
            trim: true,
        }).fromFile(CSV_FILE_PATH);

        const formatedSubCategory = rows.map(row => {
            const oldCategroyId = row.categoryId;

            return {
                name: row.name,
                category: categoriesMap[oldCategroyId],
            }
        })

        await subCategory.insertMany(formatedSubCategory,{ordered: false});
        console.log("Sub categories inserted.");
        process.exit();

    } catch (error) {
        console.error("❌ Import Failed:", error);
        process.exit(1);
    }
}

inportSubCategory();