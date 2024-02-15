import "./cartOverlayProduct.css";
import ApiService from "../../services/apiService";

const CartOverlayProduct = ({ productInfo, setCart }) => {
  const addProduct = async (prodId) => {
    try {
      await ApiService.addToCart(prodId);
      const getCartResponse = await ApiService.getCart();
      setCart(getCartResponse.data);
    } catch (err) {
      console.log(err);
    }
  };

  const decrementProduct = async (prodId) => {
    try {
      await ApiService.decrementCartProduct(prodId);
      const getCartResponse = await ApiService.getCart();
      setCart(getCartResponse.data);
    } catch (err) {
      console.log(err);
    }
  };

  const removeProduct = async (prodId) => {
    try {
      await ApiService.removeCartProduct(prodId);
      const getCartResponse = await ApiService.getCart();
      setCart(getCartResponse.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="overlay-product-card">
      <img
        className="overlay-product-img"
        src={productInfo.product.imageUrl[0]}
        alt="product"
      />
      <span className="overlay-product-price">
        ${productInfo.product.price}
      </span>
      <div className="quantity-wrapper">
        <span
          className="quantitiy-changer"
          onClick={() => decrementProduct(productInfo.product._id)}
        >
          -
        </span>
        <span className="overlay-product-quantity">{productInfo.quantity}</span>
        <span
          className="quantitiy-changer"
          onClick={() => addProduct(productInfo.product._id)}
        >
          +
        </span>
      </div>
      <span className="overlay-product-price">
        ${productInfo.product.price * productInfo.quantity}
      </span>
      <span
        className="overlay-remove-item"
        onClick={() => removeProduct(productInfo.product._id)}
      >
        Remove
      </span>
    </div>
  );
};

export default CartOverlayProduct;
