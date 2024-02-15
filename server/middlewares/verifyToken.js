const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = async (req, res, next) => {
  const { headers } = req;

  if (!headers.authorization) {
    return res.status(400).send({ msg: "No Authorization header passed" });
  }

  const [type, token] = headers.authorization.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).send({ msg: "Incorrect token or no token passed" });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id } = decoded;

    await User.findById(id).then((user) => (req.user = user));
  } catch (err) {
    return res.status(401).send({ msg: "Invalid authorization info" });
  }
  return next();
};

module.exports = verifyToken;
