const jwt = require('jsonwebtoken');
const { asyncHandler } = require('../utils/asyncHandler');
const User = require('../models/user.model');

const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access token missing"
        });
    }

    let decode;
    try {
        decode = jwt.verify(token, process.env.JWT_SECRETE);
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        })
    }

    const user = await User.findById(decode.userId);
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "User no longer exists"
        });
    }

    next();
})

module.exports = {
    verifyJWT
}