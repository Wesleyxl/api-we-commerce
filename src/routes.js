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
router.get("/categories", auth, CategoryController.index);
router.get("/category/:id_category", auth, CategoryController.show);
router.post("/category", auth, CategoryController.store);
router.put("/category/:id_category", auth, CategoryController.update);
router.delete("/category/:id_category", auth, CategoryController.delete);

// products routes
router.get("/products", auth, ProductController.index);
router.get("/product/:id_product", auth, ProductController.show);
router.put("/product/:id_product", auth, ProductController.update);
router.post("/product", auth, ProductController.store);
router.delete("/product/:id_product", auth, ProductController.delete);

module.exports = router;
