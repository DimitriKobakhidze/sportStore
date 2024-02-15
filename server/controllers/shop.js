const Product = require("../models/product");

const ITEMS_PER_PAGE = 8;

exports.getProducts = (req, res, next) => {
  let { page, sortId, prodName } = req.query;
  const { categoryName } = req.params;

  let filterObject = { type: categoryName };
  if (!categoryName || categoryName === "all") filterObject = {};
  if (prodName)
    filterObject = { ...filterObject, title: new RegExp(prodName, "i") };

  Product.find(filterObject)
    .countDocuments()
    .then((totalItems) => {
      const lastPage = Math.ceil(totalItems / ITEMS_PER_PAGE);
      if (isNaN(page) || !page || page < 1) page = 1;
      if (page > lastPage) page = lastPage;

      let sortObject = {};
      if (sortId == 1) sortObject = { price: -1 };
      if (sortId == 2) sortObject = { price: 1 };

      Product.find(filterObject)
        .sort(sortObject)
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .then((products) => res.send({ products, lastPage }))
        .catch((err) => {
          console.log(err);
          res.status(500).send({ msg: "Page Not Found" });
        });
    })
    .catch((err) => {
      res.status(500).send({ msg: "Page Not Found" });
    });
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then((product) => {
      if (!product) return res.status(404).send({ msg: "Product not found" });
      res.send(product);
    })
    .catch((err) => {
      return res.status(404).send({ msg: "Product not found" });
    });
};
exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.product")
    .then((userDoc) => res.send(userDoc.cart));
};
exports.postAddToCart = async (req, res) => {
  const { prodId } = req.body;

  Product.findById(prodId)
    .then((product) => {
      if (!product) return res.status(404).send({ msg: "Item not found" });

      req.user.addToCart(product);
    })
    .then(() => res.send())
    .catch((err) => {
      console.log(err.message);
      return res.status(404).send({ msg: "Product not found" });
    });
};
exports.postDecrementCartProduct = async (req, res) => {
  const { prodId } = req.body;

  Product.findById(prodId)
    .then((product) => {
      if (!product) return res.status(404).send({ msg: "Item not found" });

      req.user.decrementProduct(prodId, product.price);
    })
    .then(() => res.send())
    .catch((err) => {
      console.log(err.message);
      return res.status(500).send({ msg: "Something went wrong" });
    });
};
exports.postRemoveCartProduct = async (req, res) => {
  const { prodId } = req.body;

  Product.findById(prodId)
    .then((product) => {
      if (!product) return res.status(404).send({ msg: "Item not found" });

      req.user.removeProduct(prodId, product.price);
    })
    .then(() => res.send())
    .catch((err) => {
      console.log(err.message);
      return res.status(500).send({ msg: "Something went wrong" });
    });
};
