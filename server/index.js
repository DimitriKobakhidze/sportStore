require("dotenv").config();
const { MONGO_URL, PORT } = process.env;

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

app.use(bodyParser.json());

app.use(cors({ origin: "http://localhost:3000" }));

app.use(shopRoutes);
app.use(adminRoutes);
app.use(authRoutes);

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  )
  .catch((e) => console.log(e));
