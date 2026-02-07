const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/user.model");
const { asyncHandler } = require("../utils/asyncHandler");
const { signupSchema } = require("../zod/auth.validation.schema");

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

module.exports = {
  userSignup
};
