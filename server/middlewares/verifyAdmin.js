const verifyAdmin = (req, res, next) => {
  if (!req.user.isAdmin)
    return res
      .status(403)
      .send({ msg: "Not accesable route for regular user" });

  return next();
};

module.exports = verifyAdmin;
