const express = require('express');
const upload = require('../middleware/productUploads.middleware');
const { uploadProducts, getAllProducts, getCategory, newArrivals, getProducts, getProductDetails } = require('../controller/product.controller');
const { verifyJWT } = require('../middleware/auth.middleware');
const {authorizedRole} = require('../middleware/role.middleware');

const router = express.Router();

router.post('/upload-product',verifyJWT,authorizedRole("ADMIN"),upload.single("file"),uploadProducts);

router.get('/get-all-products',verifyJWT,authorizedRole("ADMIN"),getAllProducts);

router.get('/get-products/:categoryName',getProducts);

router.get('/get-products/:category/:productSlug',getProductDetails);

router.get('/category',getCategory);

router.get('/new-arrivals',newArrivals);


module.exports = (router);