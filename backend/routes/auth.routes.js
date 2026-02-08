const express = require('express');
const { userSignup, userSigin, userRefreshToken, verifyEmail, forgetPassword, resetPassword } = require('../controller/auth.controller');

const router = express.Router();

router.post('/signup', userSignup);

router.post('/signin', userSigin);

router.post('/refresh-token',userRefreshToken);

router.get('/verify-email/:verificationToken',verifyEmail);

router.post('/forget-password',forgetPassword);

router.post('/reset-password/:resetPasswordToken',resetPassword);

module.exports = router;