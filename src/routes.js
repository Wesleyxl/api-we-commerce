const express = require("express");

const auth = require("@middleware/auth");

const router = express.Router();

// controllers
const AuthController = require("@controller/AuthController");
const UserController = require("@controller/UserController");

// auth routers
router.post("/auth/sign-in", AuthController.signIn);
router.post("/auth/sign-up", AuthController.signUp);
router.get("/auth/me", auth, AuthController.me);

// user routes
router.post("/user/delete/", auth, UserController.delete);
// router.get("/user", auth, UserController.index);

module.exports = router;
