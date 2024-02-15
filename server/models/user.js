const mongoose = require("mongoose");
const { schema } = require("./product");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  cart: {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
  },
  orders: [
    [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  ],
});

userSchema.methods.addToCart = async function (product) {
  const sameItemInCart = this.cart.items.find(
    (cartProduct) => cartProduct.product.toString() === product._id.toString()
  );
  this.cart.total += product.price;
  if (sameItemInCart) {
    sameItemInCart.quantity++;
  } else {
    this.cart.items.push({ product: product._id, quantity: 1 });
  }

  try {
    await this.save();
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
userSchema.methods.decrementProduct = async function (prodId, price) {
  const sameItemInCart = this.cart.items.find(
    (cartProduct) => cartProduct.product.toString() === prodId.toString()
  );
  if (!sameItemInCart) throw new Error("Product not in user cart");

  sameItemInCart.quantity--;
  this.cart.total -= price;

  if (sameItemInCart.quantity === 0) {
    this.cart.items = this.cart.items.filter(
      (cartProduct) => cartProduct.product.toString() !== prodId.toString()
    );
  }

  await this.save();
  return true;
};
userSchema.methods.removeProduct = async function (prodId, price) {
  const sameItemInCart = this.cart.items.find(
    (cartProduct) => cartProduct.product.toString() === prodId.toString()
  );
  if (!sameItemInCart) throw new Error("Product not in user cart");

  const productTotalCost = price * sameItemInCart.quantity;
  this.cart.items = this.cart.items.filter(
    (cartProduct) => cartProduct.product.toString() !== prodId.toString()
  );
  this.cart.total = this.cart.total - productTotalCost;

  await this.save();
  return true;
};

module.exports = mongoose.model("User", userSchema);
