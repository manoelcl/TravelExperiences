const jwt = require("jsonwebtoken");

const { generateError } = require("../helpers");

const authenticateUser = (req, res, next) => {
  try {
    const { Authorization } = req.headers;
    if (!Authorization) {
      throw generateError("Authorization header missing", 401);
    }
    let token;
    try {
      token = jwt.verify(authorization.split(" ")[1], "SECRET");
    } catch (err) {
      throw generateError("Invalid token or header format", 401);
    }
    req.auth = token;
  } catch (error) {
    next(error);
  }
};
