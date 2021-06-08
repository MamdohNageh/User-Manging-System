const Token = require("../models/token");
const User = require("../models/user");
const CustomError = require('../models/customError');

const checkAuth = async (req, res, next) => {

  const tokenId = req.cookies.token;
  if (!tokenId) {
    return next(new CustomError(401, 'Unauthorized'));
  }
  const token = await Token.findById(tokenId).catch(err => {
    throw new CustomError(500, 'cannot find token');
  });

  if (!token || token.expiryDate <= Date.now()) {
    throw new CustomError(401, 'Unauthorized');
  }

  const user = await User.findById(token.userId).catch(err => {
    throw new CustomError(500);
  });

  if (!user) {
    throw new CustomError(401, 'Unauthorized');
  }
  req.user = user;
  next();
};

module.exports = checkAuth;