import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./loginPage.css";
import ApiService from "../../services/apiService";
import { AuthContext } from "../../context/AuthContext";
import AuthForm from "../AuthForm";

const LoginPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { setAuth } = useContext(AuthContext);
  const [userInput, setUserInput] = useState({ username: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await ApiService.login(userInput);
      const { token, isAdmin } = res.data;

      setAuth({ token, isAdmin });
      localStorage.setItem("token", token);
      localStorage.setItem("isAdmin", isAdmin);
      navigate("/");
    } catch (err) {
      setErrors({ other: err.response.data.msg });
    }
  };

  return (
    <AuthForm
      type="Login"
      userInput={userInput}
      setUserInput={setUserInput}
      errors={errors}
      setErrors={setErrors}
      sendData={handleLogin}
    />
  );
};

export default LoginPage;
