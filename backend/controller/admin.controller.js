const User = require("../models/user.model");
const Setting = require("../models/settings.model");
const bcrypt = require("bcryptjs");
const { asyncHandler } = require("../utils/asyncHandler");
const { adminLoginSchema, addSettingsSchema } = require("../zod/admin.validation.schema");
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

    res.cookie("refreshToken", jwtRefreshToken, {
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

const getSettings = asyncHandler(async (req, res) => {
    const settings = await Setting.find();

    const formattedSetting = {};

    settings.forEach(item => {
        formattedSetting[item.name] = item.value;
    });

    res.status(200).json({
        success: true,
        message: "Product setting fetched",
        data: {
            formattedSetting
        }
    });
});

const updateSetting  = asyncHandler(async (req, res) => {
    const validatedData = addSettingsSchema.parse(req.body);
    const { name, value } = validatedData;

    const setting = await Setting.findOneAndUpdate(
        { name },
        { value },
        { new: true, upsert: true }
    );


    res.status(200).json({
        success: true,
        message: "Product details setting found",
        data: {
            setting
        }
    });
});


const bulkUpdateSettings = asyncHandler(async (req, res) => {
    const settings = req.body;

    const operations = settings.map(item => ({
        updateOne: {
            filter: { name: item.name },
            update: { value: item.value },
            upsert: true
        }
    }));

    await Setting.bulkWrite(operations);

    res.status(200).json({
        success: true,
        message: "Settings updated successfully"
    });
});


module.exports = { adminLogin, getSettings, updateSetting , bulkUpdateSettings };