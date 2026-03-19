const express = require('express');
const { getCategory } = require('../controller/product.controller');
const { verifyJWT } = require('../middleware/auth.middleware');

const router = express.Router();

router.get("/get-category",verifyJWT,getCategory);

module.exports = (router);