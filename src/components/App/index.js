import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";

import "./app.css";
import NavBar from "../NavBar";
import ProductPage from "../ProductPage";
import ProductDetailPage from "../ProductDetailPage";
import AddProductPage from "../Admin/AddProductPage";
import LoginPage from "../LoginPage";
import RegisterPage from "../RegisterPage";
import ErrorPage from "../ErrorPage";
import { AuthContext } from "../../context/AuthContext";

const App = () => {
  const { auth } = useContext(AuthContext);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/category/all" />} />
        <Route path="/category/:categoryName" element={<ProductPage />} />
        <Route path="/products/:prodId" element={<ProductDetailPage />} />
        {!auth.token && (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </>
        )}
        {auth.isAdmin && (
          <Route path="/admin/add-product" element={<AddProductPage />} />
        )}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
