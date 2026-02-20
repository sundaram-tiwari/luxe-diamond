const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/user.model');

const checkEmailVerification = asyncHandler(async (req,res,next) => {
    const email = req.body.email;

    if(!email){
         return res.status(401).json({
            success: false,
            message: "Please provide email"
        });
    }

    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User not register. Please signup"
        });
    }

    if(!user.isEmailVerified){
        return res.status(401).json({
             success: false,
            message: "Email is not verfied. Please verify your email first"
        })
    }

    next();
})

module.exports = {checkEmailVerification}