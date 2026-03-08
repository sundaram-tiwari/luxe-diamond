const express = require("express");
const {verifyJWT} = require("../middleware/auth.middleware");
const { createUserOrder, getAllOrders } = require("../controller/order.controller");
const { authorizedRole } = require("../middleware/role.middleware");

const router = express.Router();

router.post("/create",verifyJWT,createUserOrder);

router.get("/get-all-orders",verifyJWT,authorizedRole("ADMIN"),getAllOrders);

module.exports = (router);