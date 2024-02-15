import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ApiService from "../../services/apiService";
import AuthForm from "../AuthForm";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleRegister = () => {
    const { username, email, password } = userInput;
    ApiService.register({ username, email, password })
      .then(() => navigate("/login"))
      .catch((err) => setErrors({ other: err.response.data.msg }));
  };

  return (
    <AuthForm
      type="Register"
      userInput={userInput}
      setUserInput={setUserInput}
      errors={errors}
      setErrors={setErrors}
      sendData={handleRegister}
    />
  );
};

export default RegisterPage;
