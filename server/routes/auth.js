const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");
const validateForm = require("../middlewares/validateForm");

router.post("/login", validateForm, authController.postLogin);
router.post("/register", validateForm, authController.postRegister);

module.exports = router;
