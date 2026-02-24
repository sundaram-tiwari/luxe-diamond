const express = require('express');
const { authorizedRole } = require('../middleware/role.middleware');
const { adminLogin } = require('../controller/admin.controller');
const { verifyJWT } = require('../middleware/auth.middleware');
const { getAllUsers } = require('../controller/user.controller');

const router = express.Router();

router.post('/login',adminLogin);

router.get('/users',verifyJWT,authorizedRole("ADMIN"),getAllUsers);

module.exports = (router);