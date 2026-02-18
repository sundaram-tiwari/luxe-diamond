const jwt = require('jsonwebtoken');

const generateAccessToken = (userId, role, fname) => {
    return jwt.sign({userId, role, fname},process.env.JWT_SECRETE,{expiresIn : "15min"});
}

const generateRefreshToken = (userId, role, fname) => {
    return jwt.sign({userId, role, fname},process.env.JWT_REFRESH_SECRETE,{expiresIn : "7d"});
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}