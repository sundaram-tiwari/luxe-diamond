const express = require('express');
const { userSignup, userSigin, userRefreshToken, verifyEmail, forgetPassword, resetPassword, resendVerificationEmail } = require('../controller/auth.controller');
const { checkEmailVerification } = require('../middleware/emailVerification.middleware');

const router = express.Router();

router.post('/signup', userSignup);

router.post('/login', userSigin);

router.post('/refresh-token',userRefreshToken);

router.post('/verify-email/:token',verifyEmail);

router.post('/forget-password',forgetPassword);

router.post('/reset-password/:resetPasswordToken',resetPassword);

router.post('/resend-verification-email', resendVerificationEmail);

module.exports = router;