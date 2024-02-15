const express = require("express");

const router = express.Router();

const shopController = require("../controllers/shop");
const verifyToken = require("../middlewares/verifyToken");

router.get("/category/:categoryName", shopController.getProducts);
router.get("/products/:productId", shopController.getProduct);
router.post("/add-to-cart", verifyToken, shopController.postAddToCart);
router.post(
  "/decrement-cart-product",
  verifyToken,
  shopController.postDecrementCartProduct
);
router.post(
  "/remove-from-cart",
  verifyToken,
  shopController.postRemoveCartProduct
);
router.get("/get-cart", verifyToken, shopController.getCart);

module.exports = router;
