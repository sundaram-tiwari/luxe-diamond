const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    receiverName: String,
    phone: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    pincode: String,
    country: {
        type: String,
        default: "India"
    }
}, { _id: false });

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    addresses: [addressSchema],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    refreshToken: {
        type: String,
        select: false 
    },
    emailVerificationToken: String,
    emailVerificationExpiry: Date,

    resetPasswordToken: String,
    resetPasswordExpiry: Date,
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);