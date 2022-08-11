const User = require("@model/User");
const bcrypt = require("bcrypt");

// helpers
const createUserToken = require("@helper/createUserToken");

module.exports = {
  // create neu user
  async signUp(req, res) {
    const { name, email, password } = req.body;

    // validating fields
    if (name === "" || !name) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (email === "" || !email) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (password === "" || !password) {
      return res.status(400).json({ error: "Password is required" });
    }

    // password hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const user = await User.create({ name, email, password: hashedPassword });

    return res.json({
      user: { id: user.id, name: user.name, email: user.email },
      access_token: createUserToken(user.id),
    });
  },

  // sig in
  async signIn(req, res) {
    const { email, password } = req.body;

    // validating fields
    if (email === "" || !email) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (password === "" || !password) {
      return res.status(400).json({ error: "Password is required" });
    }

    // checking if the email exists
    const user = await User.findOne({
      where: { email },
      attributes: ["id", "email", "name", "password"],
    });

    // return error
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }

    // validating password
    const validPass = await bcrypt.compare(password, user.password);

    // return error
    if (!validPass) {
      return res
        .status(400)
        .json({ success: false, message: "password is incorrect" });
    }

    // return user with new token
    return res.json({
      user: { id: user.id, name: user.name, email: user.email },
      access_token: createUserToken(user.id),
    });
  },

  // me
  async me(req, res) {
    const authId = await res.locals.auth_data.id;

    const user = await User.findByPk(authId, {
      attributes: { exclude: "password" },
    });

    if (!user) {
      return res.status(400).json({ error: "user not found" });
    }

    return res.json(user);
  },
};
