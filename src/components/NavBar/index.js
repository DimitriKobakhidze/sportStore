import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import "./navBar.css";
import { AuthContext } from "../../context/AuthContext";
import { IoCartOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import CartOverlay from "../CartOverlay";

const NavBar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [showCartOverlay, setShowCartOverlay] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setAuth({});
  };
  return (
    <div className="navigation">
      {showCartOverlay && (
        <CartOverlay setShowCartOverlay={setShowCartOverlay} />
      )}
      <Link to="category/all">
        <span className="brand-name">.sport</span>
      </Link>
      <ul>
        <li>
          <NavLink
            to="category/all"
            className={({ isActive }) => (isActive ? "active-navlink" : "")}
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category/shirts"
            className={({ isActive }) => (isActive ? "active-navlink" : "")}
          >
            Shirts
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category/trousers"
            className={({ isActive }) => (isActive ? "active-navlink" : "")}
          >
            Trousers
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category/shorts"
            className={({ isActive }) => (isActive ? "active-navlink" : "")}
          >
            Shorts
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category/shoes"
            className={({ isActive }) => (isActive ? "active-navlink" : "")}
          >
            Shoes
          </NavLink>
        </li>
        {auth.isAdmin === true && (
          <li>
            <NavLink
              to="/admin/add-product"
              className={({ isActive }) => (isActive ? "active-navlink" : "")}
            >
              Add Product
            </NavLink>
          </li>
        )}
      </ul>
      <div className="nav-options-wrapper">
        {!auth.token ? (
          <Link to="/login">
            <GoPerson className="nav-person-icon" />
          </Link>
        ) : (
          <>
            <span
              className="nav-cart-span"
              onClick={() => setShowCartOverlay(true)}
            >
              <IoCartOutline className="nav-cart-icon" />
            </span>
            <span className="logout-span" onClick={logout}>
              <IoLogOutOutline className="logout-icon" />
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
