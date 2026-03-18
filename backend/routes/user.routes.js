const express = require('express');
const { getUser, updateUser, updateUserAddress, getYourOrderHistory } = require('../controller/user.controller');
const { verifyJWT } = require('../middleware/auth.middleware');
const {authorizedRole} = require('../middleware/role.middleware');

const router = express.Router();

router.get("/profile",verifyJWT,getUser);

router.put("/update-profile",verifyJWT,updateUser);

router.put("/update-address", verifyJWT, updateUserAddress);

// router.get("orders-history",verifyJWT(),getYourOrderHistory);

module.exports = (router);