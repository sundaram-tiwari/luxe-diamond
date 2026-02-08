const express = require('express');
const { userSignup, userSigin, userRefreshToken } = require('../controller/auth.controller');

const router = express.Router();

router.post('/signup', userSignup);

router.post('/signin', userSigin);

router.post('/refresh-token',userRefreshToken)

module.exports = router;