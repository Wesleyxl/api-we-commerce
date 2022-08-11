const { Model, DataTypes } = require("sequelize");

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        image: DataTypes.STRING,
        price: DataTypes.FLOAT,
        likes: DataTypes.INTEGER,
        sales: DataTypes.INTEGER,
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
    });
  }
}

module.exports = Product;
