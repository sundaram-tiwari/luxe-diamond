const express = require("express");
const {verifyJWT} = require("../middleware/auth.middleware");
const { createUserOrder } = require("../controller/order.controller");

const router = express.Router();

router.post("/create",verifyJWT,createUserOrder);

module.exports = (router);