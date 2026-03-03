const express = require('express');
const { authorizedRole } = require('../middleware/role.middleware');
const { adminLogin, getSettings, updateSetting, bulkUpdateSettings  } = require('../controller/admin.controller');
const { verifyJWT } = require('../middleware/auth.middleware');
const { getAllUsers } = require('../controller/user.controller');

const router = express.Router();

router.post('/login',adminLogin);

router.get('/users',verifyJWT,authorizedRole("ADMIN"),getAllUsers);

router.get('/settings',verifyJWT,authorizedRole("ADMIN"),getSettings);

router.put('/setting',verifyJWT,authorizedRole("ADMIN"),updateSetting );

router.put('/settings',verifyJWT,authorizedRole("ADMIN"),bulkUpdateSettings );


module.exports = (router);