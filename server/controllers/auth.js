require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.postLogin = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username })
    .then((user) => {
      if (!user || user.password !== password)
        return res.status(401).send({ msg: "Incorrect username or password" });

      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.TOKEN_SECRET
      );
      return res.send({ token, isAdmin: user.isAdmin });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ msg: "An error occurred while logging in." });
    });
};

exports.postRegister = (req, res) => {
  const { username, email, password } = req.body;

  const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegExp.test(email))
    return res.status(401).send({ msg: "Invalid values" });

  User.findOne({ username: username })
    .then((userDoc) => {
      if (userDoc)
        return res.status(409).send({ msg: "Username already exists" });

      const user = new User({
        username,
        email,
        password,
        isAdmin: false,
        orders: [],
        cart: { items: [], total: 0 },
      });

      user.save();
      return res.send();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ msg: "An error occurred while registering." });
    });
};
