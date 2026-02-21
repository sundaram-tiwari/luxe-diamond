const express = require('express');
const { userSignup, userSigin, userRefreshToken, verifyEmail, forgetPassword, resetPassword, resendVerificationEmail, checkEmailVerificationStatus } = require('../controller/auth.controller');

const router = express.Router();

router.post('/signup', userSignup);

router.post('/login', userSigin);

router.post('/refresh-token',userRefreshToken);

router.post('/verify-email/:token',verifyEmail);

router.post('/forget-password',forgetPassword);

router.post('/reset-password/:resetPasswordToken',resetPassword);

router.post('/resend-verification-email', resendVerificationEmail);

router.post('/email-verification-status', checkEmailVerificationStatus);

module.exports = router;