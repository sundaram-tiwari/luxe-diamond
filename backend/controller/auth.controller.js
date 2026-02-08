const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken")
const User = require("../models/user.model");
const { asyncHandler } = require("../utils/asyncHandler");
const { signupSchema, signinSchema } = require("../zod/auth.validation.schema");
const { generateAccessToken, generateRefreshToken } = require("../utils/tokenHandler");

const userSignup = asyncHandler(async (req, res) => {

  const validatedData = signupSchema.parse(req.body);
  const { firstName, lastName, email, phone, password } = validatedData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "User already exists. Please SignIn"
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const verificationToken = crypto.randomBytes(32).toString("hex");

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password: hashedPassword,
    emailVerificationToken: verificationToken,
    emailVerificationExpiry: Date.now() + 24 * 60 * 60 * 1000
  });

  res.status(201).json({
    success: true,
    message: "Signup successful. Please verify your email.",
    data: {
      id: user._id,
      email: user.email
    }
  });
});


const userSigin = asyncHandler(async (req, res) => {
  const validatedData = signinSchema.parse(req.body);

  const { email, password } = validatedData;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(409).json({
      success: false,
      message: "User not found. Please signup"
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(404).send({
      success: false,
      message: 'Incorrect Password'
    });
  }

  const jwtToken = generateAccessToken(user._id);
  const jwtRefreshToken = generateRefreshToken(user._id);

  user.refreshToken = await bcrypt.hash(jwtRefreshToken, 10);
  await user.save();

  res.cookie("refreshToken", jwtRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    message: "Signin successfull",
    tokens: [{
      jwtToken,
    }]
  });

});


const userRefreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(409).json({
      success: false,
      message: "Token is missing. Please Login"
    });
  }

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRETE);

  const user = await user.findById(decoded.userId);
  if (!user || !user.refreshToken) {
    return res.status(403).json({
      success: false,
      message: "Invalid refresh token"
    });
  }

  const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
  if (!isValid) {
    return res.status(403).json({
      success: false,
      message: "Refresh token mismatch"
    });
  }

  const newAccessToken = generateAccessToken(decoded.userId);

  res.json({
    success: true,
    accessToken: newAccessToken
  })
});

module.exports = {
  userSignup,
  userSigin,
  userRefreshToken
};
