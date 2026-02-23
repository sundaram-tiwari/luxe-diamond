const express = require('express');
const upload = require('../middleware/productUploads.middleware');
const { uploadProducts } = require('../controller/product.controller');
const { verifyJWT } = require('../middleware/auth.middleware');
const {authorizedRole} = require('../middleware/role.middleware');

const router = express.Router();

router.post('/upload-product',verifyJWT,authorizedRole("ADMIN"),upload.single("file"),uploadProducts);

module.exports = (router);

