const Product = require("@model/Product");

module.exports = {
  // show all products
  async index(req, res) {
    const products = await Product.findAll({
      attributes: ["id", "name", "description", "image"],
      include: {
        association: "category",
        attributes: ["id", "name"],
      },
    });

    if (products.length < 1) {
      return res.status(400).json({ message: "No products found" });
    }

    return res.json(products);
  },

  // show one product
  async show(req, res) {
    const { id_product } = req.params;

    const product = await Product.findByPk(id_product);

    if (!product) {
      return res.status(400).json({ message: "No product found" });
    }

    return res.json(product);
  },

  // create new product
  async store(req, res) {
    const { name, category_id, description, image, price } = req.body;

    // validating fields
    if (!name || name === "") {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!category_id || category_id === "") {
      return res.status(400).json({ message: "Category is required" });
    }
    if (!description || description === "") {
      return res.status(400).json({ message: "Description is required" });
    }
    if (!image || image === "") {
      return res.status(400).json({ message: "Image is required" });
    }
    if (!price || price === "") {
      return res.status(400).json({ message: "Price is required" });
    }

    // create new user
    const product = await Product.create({
      name,
      category_id,
      description,
      image,
      price,
    });

    // return error
    if (!product) {
      return res.status(400).json({ message: "Something went wrong" });
    }

    return res.json(product);
  },

  // update product
  async update(req, res) {
    const { id_product } = req.params;
    const { name, category_id, description, image, price } = req.body;

    // validating fields
    if (!name || name === "") {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!category_id || category_id === "") {
      return res.status(400).json({ message: "Category is required" });
    }
    if (!description || description === "") {
      return res.status(400).json({ message: "Description is required" });
    }
    if (!image || image === "") {
      return res.status(400).json({ message: "Image is required" });
    }
    if (!price || price === "") {
      return res.status(400).json({ message: "Price is required" });
    }

    const product = await Product.findByPk(id_product);

    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    const update = await Product.update(
      {
        name,
        category_id,
        description,
        image,
        price,
      },
      {
        where: {
          id: id_product,
        },
      }
    );

    if (!update) {
      return res.status(400).json({ message: "Something went wrong" });
    }

    return res.json({ message: "product successfully updated" });
  },

  // delete existing product
  async delete(req, res) {
    const { id_product } = req.params;
    const product = await Product.findByPk(id_product);

    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    const isRemoved = await Product.destroy({
      where: { id: id_product },
    });

    if (!isRemoved) {
      return res.status(400).json({ message: "Something went wrong" });
    }

    return res.json({ message: "product successfully removed" });
  },
};
