const express = require("express");
const upload = require("../middleware/productUploads.middleware");
const {
  uploadProducts,
  getAllProducts,
  getCategory,
  newArrivals,
  bestSellers,
  getProducts,
  getProductDetails,
  calculatePrice,
  deleteProduct,
  addSingleProduct,
  searchProducts,
  getProductBySku,
  updateProductData,
} = require("../controller/product.controller");
const { verifyJWT } = require("../middleware/auth.middleware");
const { authorizedRole } = require("../middleware/role.middleware");
const uploadImageAndVideo = require("../middleware/uploadProductImage.middleware");

const router = express.Router();

router.post(
  "/upload-product",
  verifyJWT,
  authorizedRole("ADMIN"),
  upload.single("file"),
  uploadProducts,
);

router.get(
  "/get-all-products",
  verifyJWT,
  authorizedRole("ADMIN"),
  getAllProducts,
);

router.delete(
  "/delete-product/:productSku",
  verifyJWT,
  authorizedRole("ADMIN"),
  deleteProduct,
);

router.get("/get-products/:categoryName", getProducts);

router.get("/get-products/:category/:productSlug", getProductDetails);

router.get("/category", getCategory);

router.get("/new-arrivals", newArrivals);

router.get("/best-sellers", bestSellers);

router.get("/search", searchProducts);

router.post("/calculate-price", verifyJWT, calculatePrice);

router.post(
  "/add-product",
  verifyJWT,
  authorizedRole("ADMIN"),
  uploadImageAndVideo,
  addSingleProduct
);

router.get(
  "/get-product/:sku",
  verifyJWT,
  authorizedRole("ADMIN"),
  getProductBySku
);

router.put(
  "/update-product/:sku",
  verifyJWT,
  authorizedRole("ADMIN"),
  updateProductData
);

module.exports = router;
