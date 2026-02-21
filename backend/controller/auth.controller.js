const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken")
const User = require("../models/user.model");
const { asyncHandler } = require("../utils/asyncHandler");
const { signupSchema, signinSchema, forgetPasswordSchema, resetPasswordSchema, resendVerificationEmailSchema, checkEmailVerificationStatusSchema } = require("../zod/auth.validation.schema");
const { generateAccessToken, generateRefreshToken } = require("../utils/tokenHandler");
const sendMail = require("../utils/sendEmail");
const { isEmailVerified } = require("../utils/emailHandler");
const { success } = require("zod");


const userSignup = asyncHandler(async (req, res) => {

  const validatedData = signupSchema.parse(req.body);
  const { firstName, lastName, email, password } = validatedData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "User already exists. Please SignIn"
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const verificationToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    emailVerificationToken: hashedToken,
    emailVerificationExpiry: Date.now() + 10 * 60 * 1000
  });

  const verifyUrl = `${process.env.CLIENT_URL}verify-email?token=${verificationToken}`;

  await sendMail({
    to: email,
    subject: "Verify your email - Luxe Diamond",
    template: "verifyEmail",
    data: {
      name: user.firstName,
      verifyUrl
    }
  });

  res.status(201).json({
    success: true,
    message: "Signup successful. Verification email has been send. Please verify email.",
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

  const role = user.role;
  const fname = user.firstName;

  const jwtToken = generateAccessToken(user._id, role, fname);
  const jwtRefreshToken = generateRefreshToken(user._id, role, fname);

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
    data: {
      emailVerified: user.isEmailVerified,
      token: jwtToken
    }
  });

});

const userRefreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Token is missing. Please Login"
    });
  }

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRETE);

  const user = await User.findById(decoded.userId).select("+refreshToken");;
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
    ,
    data: null
  })
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const email = req.body.email;

  if (email) {
    const user = await User.findOne({ email });
    if (user) {
      if (user.isEmailVerified) {
        return res.status(200).json({
          success: true,
          message: "Email already verified successfully",
          data: {
            emailVerified: true
          }
        });
      }
    }
  }

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpiry: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(409).json({
      success: false,
      message: "Invalid token. User not found"
    });
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = null;
  user.emailVerificationExpiry = null;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Email verified successfully",
    data: {
      emailVerified: true
    }
  });
});

const resendVerificationEmail = asyncHandler(async (req, res) => {
  const validatedData = resendVerificationEmailSchema.parse(req.body);
  const { email } = validatedData;

  const emailVerified = await isEmailVerified(email);
  if (emailVerified) {
    return res.status(200).json({
      success: true,
      message: "Email is already verified",
      data: {
        emailVerified
      }
    })
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User is not registered"
    })
  }

  const verificationToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = Date.now() + 10 * 60 * 1000
  await user.save();

  const verifyUrl = `${process.env.CLIENT_URL}verify-email?token=${verificationToken}`;

  await sendMail({
    to: email,
    subject: "Verify your email - Luxe Diamond",
    template: "verifyEmail",
    data: {
      name: user.firstName,
      verifyUrl
    }
  });

  res.status(200).json({
    success: true,
    message: "Email verfication link has been send. Please verify your email !"
    ,
    data: null
  })
})

const checkEmailVerificationStatus = asyncHandler(async (req, res) => {
  const validatedData = checkEmailVerificationStatusSchema.parse(req.body);
  const { email } = validatedData;

  const emailVerified = await isEmailVerified(email);
  if (emailVerified) {
    return res.status(200).json({
      success: true,
      message: "Email has been verified",
      data: {
        emailVerified
      }
    })

  }
  res.status(401).json({
    success: false,
    message: "Email is not verified",
  })
})

const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = forgetPasswordSchema.parse(req.body);

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(409).json({
      success: false,
      message: "Email is not registered"
    });
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordToken = hashedResetToken;
  user.resetPasswordExpiry = Date.now() + 10 * 60 * 1000;
  await user.save();

  const resetPasswordUrl = `${process.env.CLIENT_URL}reset-password?token=${resetToken}`

  await sendMail({
    to: email,
    subject: "Reset your password - Luxe Diamond",
    template: "resetPasswordEmail",
    data: {
      name: user.firstName,
      resetPasswordUrl
    }
  });

  res.status(200).json({
    success: true,
    message: "Password reset link sent to your email",
    data: null
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = resetPasswordSchema.parse(req.body);

  const { resetPasswordToken } = req.params;

  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetPasswordToken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedResetToken,
    resetPasswordExpiry: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(409).json({
      success: false,
      message: "Invalid token"
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiry = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successfull. Please signin",
    data: null
  });
});

module.exports = {
  userSignup,
  userSigin,
  userRefreshToken,
  verifyEmail,
  resendVerificationEmail,
  checkEmailVerificationStatus,
  forgetPassword,
  resetPassword
};
