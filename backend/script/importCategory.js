const csv = require('csvtojson');
const { connectDatabase } = require('../config/dbConnect');
const Category = require('../models/category.model');

require('dotenv').config();

const CSV_FILE_PATH = './data/csv/category.csv';

const importCategories = async () => {
    try {
        await connectDatabase();

        await Category.deleteMany({});
        console.log("Old categories removed");

        const rows = await csv({
            noheader: true,
            headers: ["id", "name", "status", "createdAt", "updatedAt"],
            trim: true,
        }).fromFile(CSV_FILE_PATH);

        const categories = [];

        for (const row of rows) {
            categories.push({
                name: row.name,
                status: row.status === "1"
            });
        }

        await Category.insertMany(categories, { ordered: false });

        console.log(`🎉 Successfully Imported ${categories.length} Categories`);
        process.exit();

    } catch (error) {
        console.error("❌ Import Failed:", error);
        process.exit(1);
    }
};

importCategories();