const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
         unique: true
    },
    value: {
        type: Number,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model("Setting",settingSchema);