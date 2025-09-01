const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  // read the token from the request header
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).send("token is not valid !!!!! ");
    }

    const decodeObj = await jwt.verify(token, "meet_dev");

    const { _id } = decodeObj;
    const user = await User.findById(_id);
    if (!user) {
      res.status(401).send("user not found");
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(401).send("ERROR" + err.message);
  }
};

module.exports = {
  userAuth,
};
