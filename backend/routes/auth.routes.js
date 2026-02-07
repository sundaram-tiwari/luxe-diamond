const express = require('express');
const { userSignup } = require('../controller/auth.controller');

const router = express.Router();

router.post('/signup', userSignup);

router.post('/signin', (req, res) => {
    res.json({
        msg: "Sign in Rout"
    })
});

module.exports = router;
