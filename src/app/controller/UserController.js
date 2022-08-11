const User = require("@model/User");

module.exports = {
  // store
  async delete(req, res) {
    const { id_user } = req.body;

    const authId = await res.locals.auth_data.id;

    if (authId !== id_user) {
      return res.status(401).json({ message: "you don't have permission" });
    }

    const deleted = await User.destroy({ where: { id: id_user } });

    if (!deleted) {
      return res.status(400).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "user successfully deleted" });
  },

  async index(req, res) {
    const users = await User.findAll();

    return res.status(200).json(users);
  },
};
