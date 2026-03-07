const express = require('express');
const { getUser } = require('../controller/user.controller');

const router = express.Router();

router.get("/profile",verifyJWT,getUser);

module.exports = router;