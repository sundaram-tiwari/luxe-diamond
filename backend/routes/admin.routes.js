const express = require('express');
const { authorizedRole } = require('../middleware/role.middleware');
const { adminLogin } = require('../controller/admin.controller');

const router = express.Router();

router.post('/login',adminLogin);

module.exports = (router);