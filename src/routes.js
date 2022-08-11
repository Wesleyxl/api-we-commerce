const express = require("express");

const auth = require("@middleware/auth");

const router = express.Router();

// controllers
const AuthController = require("@controller/AuthController");
const UserController = require("@controller/UserController");
const CategoryController = require("@controller/CategoryController");
const ProductController = require("@controller/ProductController");

// auth routers
router.post("/auth/sign-in", AuthController.signIn);
router.post("/auth/sign-up", AuthController.signUp);
router.get("/auth/me", auth, AuthController.me);

// user routes
router.post("/user/delete/", auth, UserController.delete);
// router.get("/user", auth, UserController.index);

// category routes
router.get("/categories", CategoryController.index);
router.get("/category/:category_id", CategoryController.store);
router.post("/category", CategoryController.store);
router.put("/category/:id", CategoryController.update);

// products routes

module.exports = router;
