const Product = require("../models/product");

exports.postAddProduct = (req, res) => {
  const { title, type, price, stars, reviewCount, description, imageUrl } =
    req.body;

  const product = new Product({
    title,
    price,
    type,
    stars,
    reviewCount,
    description,
    imageUrl,
  });
  product
    .save()
    .then(() => {
      return res.send(product._id);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ msg: "something went wrong" });
    });
};
exports.postDeleteProduct = (req, res) => {
  const { prodId } = req.body;

  Product.deleteOne({ _id: prodId })
    .then(() => res.send())
    .catch((err) => {
      console.log(err);
      res.status("400").send({ msg: "Couldnt delete" });
    });
};
