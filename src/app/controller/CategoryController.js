const Category = require("@model/Category");

module.exports = {
  async index(req, res) {
    const categories = await Category.findAll();

    if (categories.length <= 0) {
      return res.status(400).json({ error: "No categories found" });
    }

    return res.json(categories);
  },

  // show existing category
  async show(req, res) {
    const { id_category } = req.params;

    const category = await Category.findByPk(id_category);

    if (!category) {
      return res.status(400).json({ error: "Category not found" });
    }

    return res.json(category);
  },

  // create new category
  async store(req, res) {
    const { name } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ error: "Name is required" });
    }

    const category = await Category.create({ name });

    return res.json(category);
  },

  // update existing category
  async update(req, res) {
    const { id_category } = req.params;
    const { name } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ error: "Name is required" });
    }

    const category = await Category.update(
      { name },
      { where: { id: id_category } }
    );

    if (!category) {
      return res.status(400).json({ error: "Something went wrong" });
    }

    return res.json({ message: "category successfully edited" });
  },

  // delete existing category
  async delete(req, res) {
    const { id_category } = req.params;

    const category = await Category.findByPk(id_category);

    if (!category) {
      return res.status(400).json({ error: "Category does not exist" });
    }

    await Category.destroy({ where: { id: id_category } });

    return res.json({ message: "category successfully removed" });
  },
};
