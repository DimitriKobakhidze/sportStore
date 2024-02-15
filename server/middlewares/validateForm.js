const validateForm = (req, res, next) => {
  const { username, password } = req.body;

  const errColector = [];

  const usernameRegExp = /^[a-zA-Z][a-zA-Z0-9_-]{2,15}$/;
  const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!usernameRegExp.test(username)) errColector.push("Invalid Username");
  if (!passwordRegExp.test(password))
    errColector.push(
      "At Least 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number."
    );

  if (errColector.length)
    return res.status(401).send({ msg: "Invalid values" });

  return next();
};

module.exports = validateForm;
