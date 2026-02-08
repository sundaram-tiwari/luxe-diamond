const express = require('express');
const { userSignup, userSigin, userRefreshToken, verifyEmail } = require('../controller/auth.controller');

const router = express.Router();

router.post('/signup', userSignup);

router.post('/signin', userSigin);

router.post('/refresh-token',userRefreshToken);

router.get('/verify-email/:verificationToken',verifyEmail);

module.exports = router;