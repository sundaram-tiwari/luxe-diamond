const express = require('express');

const router = express.Router();

router.post('/signup', (req, res) => {
    res.json({
        msg: "Sign up Rout"
    })
});

router.post('/signin', (req, res) => {
    res.json({
        msg: "Sign in Rout"
    })
});

module.exports = router;