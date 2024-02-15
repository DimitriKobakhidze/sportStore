import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./productItem.css";
import { GoStarFill } from "react-icons/go";
import { FaCartPlus } from "react-icons/fa";
import ApiService from "../../services/apiService";
import { AuthContext } from "../../context/AuthContext";

const ProductItem = ({ productData }) => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    _id: prodId,
    title,
    price,
    stars,
    reviewCount,
    imageUrl,
  } = productData;

  const addToCart = async () => {
    if (!auth.token) return navigate("/login");
    ApiService.addToCart(productData._id).catch((err) =>
      alert("Coudlnt add product")
    );
  };

  const starsArray = [];
  for (let i = 0; i < stars; i++) {
    starsArray.push(<GoStarFill key={i} color="gold" className="star-icon" />);
  }
  return (
    <div className="product-card">
      <div className="card-image-wrapper">
        <img className="card-image" src={imageUrl[0]} alt="product" />
      </div>
      <h3 className="card-title">{title}</h3>
      <div className="card-review">
        {starsArray}
        <span>({reviewCount})</span>
      </div>
      <h3 className="card-price">${price}</h3>
      <div className="card-operations">
        <Link to={`/products/${prodId}`}>Details</Link>
        <div className="card-add-wrapper" onClick={addToCart}>
          <FaCartPlus className="card-add" />
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
