const Order = require("../models/order.model");
const User = require("../models/user.model");
const { asyncHandler } = require("../utils/asyncHandler");
const { updateUserSchema, updateUserAddressSchema } = require("../zod/user.validation");

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
    const userId = req.user._id;

    const user = await User.findById(userId);
    
    if(!user){
        res.status(404).json({
            success: true,
            message: "User not found please login"
        })
    }

    res.status(200).json({
        success: true,
        message: "User found successfully",
        data: {
            user
        }
    })
});

const updateUser = asyncHandler(async (req,res) => {
    const validatedData = updateUserSchema.parse(req.body);
    const {firstName, lastName, email, phone, password, newPassword} = validatedData;
    
    const user = await User.findByIdAndUpdate(req.user._id,{
        firstName:firstName,
        lastName: lastName,
        email: email,
        phone: phone
    });

    if(!user){
        res.status(401).json({
            success:false,
            message:"User profile update failed"
        })
    }
    
    res.status(200).json({
        success:true,
        message:"User profile updated",
        data:{
            user
        }
    })
});

const updateUserAddress = asyncHandler(async (req,res) => {
    const validatedData = updateUserAddressSchema.parse(req.body);
    const {receiverName, phone, addressLine1, city, state, pincode, country} = validatedData;
    
    const address = {
        receiverName: receiverName,
        phone: phone,
        addressLine1: addressLine1,
        city: city,
        state:state,
        pincode:pincode,
        country: country
    }
    const user = await User.findByIdAndUpdate(req.user._id,{
        addresses:address
    });

    if(!user){
        res.status(401).json({
            success:false,
            message:"User address update failed"
        })
    }

    console.log(user.addresses);
    
    res.status(200).json({
        success:true,
        message:"User profile updated",
        data:{
            address:user.addresses
        }
    })
});

const getYourOrderHistory = asyncHandler(async (req,res) => {
    const userId = req.user._id;
    const orders = await Order.find({userId: userId});
})

module.exports = {getAllUsers, getUser, updateUser, updateUserAddress, getYourOrderHistory}