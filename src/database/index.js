const Sequelize = require("Sequelize");
const dbConfig = require("@config/database");

const connection = new Sequelize(dbConfig);

module.exports = connection;