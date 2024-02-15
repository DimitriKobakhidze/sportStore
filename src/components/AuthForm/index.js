import { Link } from "react-router-dom";

const AuthForm = ({
  type,
  userInput,
  setUserInput,
  errors,
  setErrors,
  sendData,
}) => {
  const updateInput = (e) => {
    setUserInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const { username, email, password, repeatPassword } = userInput;
    const errColector = {};

    const usernameRegExp = /^[a-zA-Z][a-zA-Z0-9_-]{2,15}$/;
    const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!usernameRegExp.test(username))
      errColector.username = "Invalid Username";
    if (!passwordRegExp.test(password))
      errColector.password =
        "At Least 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number.";
    if (type === "Register") {
      if (password !== repeatPassword)
        errColector.repeatPassword = "Passwords Dont Match";
      if (!emailRegExp.test(email)) errColector.email = "Invalid Email";
    }

    if (Object.keys(errColector).length) return setErrors(errColector);
    sendData();
  };

  return (
    <div className="auth-form">
      <div className="input-wrapper">
        <span className="input-header">Username</span>
        <input
          placeholder="Username"
          name="username"
          value={userInput.username}
          onInput={updateInput}
        />
        {errors.username && (
          <span className="error-span">{errors.username}</span>
        )}
      </div>
      <div className="input-wrapper">
        <span className="input-header">Password</span>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={userInput.password}
          onInput={updateInput}
        />
        {errors.password && (
          <span className="error-span">{errors.password}</span>
        )}
      </div>
      {type === "Register" && (
        <>
          <div className="input-wrapper">
            <span className="input-header">Repeat Password</span>
            <input
              type="password"
              placeholder="Repeat Password"
              name="repeatPassword"
              value={userInput.repeatPassword}
              onInput={updateInput}
            />
            {errors.repeatPassword && (
              <span className="error-span">{errors.repeatPassword}</span>
            )}
          </div>
          <div className="input-wrapper">
            <span className="input-header">Email</span>
            <input
              placeholder="Email"
              name="email"
              value={userInput.email}
              onInput={updateInput}
            />
            {errors.email && <span className="error-span">{errors.email}</span>}
          </div>
        </>
      )}
      {errors.other && <span className="error-span">{errors.other}</span>}
      <button className="auth-form-button" onClick={validate}>
        {type}
      </button>
      {type === "Login" ? (
        <span>
          Dont have account?
          <Link to="/register">Register</Link>
        </span>
      ) : (
        <span>
          Already have account?
          <Link to="/login">Login</Link>
        </span>
      )}
    </div>
  );
};

export default AuthForm;
