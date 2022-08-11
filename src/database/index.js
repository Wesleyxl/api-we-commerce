const Sequelize = require("sequelize");
const dbConfig = require("@config/database");

const connection = new Sequelize(dbConfig);

// includes models
const User = require("@model/User");
const Category = require("@model/Category");
const Product = require("@model/Product");

// init models
User.init(connection);
Category.init(connection);
Product.init(connection);

// models associations
Category.associate(connection.models);
Product.associate(connection.models);

module.exports = connection;
