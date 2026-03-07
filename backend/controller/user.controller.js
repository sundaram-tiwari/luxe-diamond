const User = require("../models/user.model");
const { asyncHandler } = require("../utils/asyncHandler");

const getAllUsers = asyncHandler(async (req,res) => {
    const users = await User.find({});

    if(!users){
         return res.status(404).json({
            success: false,
            message: "No user found",
        });
    }

    res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: {
            users
        }
    });
});

const getUser = asyncHandler(async (req,res) => {

});

module.exports = {getAllUsers, getUser}