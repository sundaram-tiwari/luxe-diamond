const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { asyncHandler } = require("../utils/asyncHandler");
const { adminLoginSchema } = require("../zod/admin.validation.schema");
const { generateAccessToken, generateRefreshToken } = require("../utils/tokenHandler");

const adminLogin = asyncHandler(async (req, res) => {
    const validatedData = adminLoginSchema.parse(req.body);
    const { email, password } = validatedData;

    const admin = await User.findOne({ email: email, role: "ADMIN" });
    if (!admin) {
        return res.status(404).json({
            success: false,
            message: "Admin not found"
        })
    }

    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch) {
        return res.status(401).json({
            success: false,
            message: "Password incorrect"
        })
    }

    const jwtToken = generateAccessToken(admin._id, admin.role, admin.firstName);
    const jwtRefreshToken = generateRefreshToken(admin._id, admin.role, admin.firstName);

    admin.refreshToken = await bcrypt.hash(jwtRefreshToken, 10);
    await admin.save();

    res.cookie("refreshToken", jwtRefreshToken,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.status(201).json({
        success: true,
        message: "Login successfull",
        data: {
            emailVerified: admin.isEmailVerified,
            token: jwtToken
        }
    })
});

module.exports = {adminLogin};