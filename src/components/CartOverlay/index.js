import { useEffect, useState, useRef } from "react";
import "./cartOverlay.css";

import { RxCross1 } from "react-icons/rx";
import ApiService from "../../services/apiService";
import CartOverlayProduct from "../CartOverlayProduct";

const CartOverlay = ({ setShowCartOverlay }) => {
  const ref = useRef(null);
  const [cart, setCart] = useState({ items: [], total: 0 });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowCartOverlay(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    ApiService.getCart().then((res) => setCart(res.data));

    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, [setShowCartOverlay]);

  return (
    <div className="cart-overlay" ref={ref}>
      <span className="close-overlay" onClick={() => setShowCartOverlay(false)}>
        <RxCross1 className="overlay-close-icon" />
      </span>
      <span className="order">ORDER</span>
      <span>Total</span>
      <span className="cart-overlay-total">${cart.total}</span>
      <div className="cart-overlay-items">
        {cart.items.map((productInfo) => (
          <CartOverlayProduct
            key={productInfo._id}
            productInfo={productInfo}
            setCart={setCart}
          />
        ))}
      </div>
    </div>
  );
};

export default CartOverlay;
