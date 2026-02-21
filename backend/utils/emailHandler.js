const User = require("../models/user.model");

const isEmailVerified = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    return false;
  }

  if (user.isEmailVerified) {
    return true;
  }

  return false;
};

module.exports = { isEmailVerified };