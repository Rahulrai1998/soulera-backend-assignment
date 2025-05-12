import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(
  "your_db_name",
  "your_db_user",
  "your_db_password",
  {
    host: "localhost",
    dialect: "postgres",
  }
);

export default db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import models
db.User = require("./User")(sequelize, DataTypes);
db.Category = require("./Category")(sequelize, DataTypes);
db.Product = require("./Product")(sequelize, DataTypes);
db.Order = require("./Order")(sequelize, DataTypes);
db.OrderItem = require("./OrderItem")(sequelize, DataTypes);

// Setup associations
db.User.hasMany(db.Order, { foreignKey: "userId" });
db.Order.belongsTo(db.User, { foreignKey: "userId" });

db.Category.hasMany(db.Product, { foreignKey: "categoryId" });
db.Product.belongsTo(db.Category, { foreignKey: "categoryId" });

db.Order.hasMany(db.OrderItem, { foreignKey: "orderId" });
db.OrderItem.belongsTo(db.Order, { foreignKey: "orderId" });

db.Product.hasMany(db.OrderItem, { foreignKey: "productId" });
db.OrderItem.belongsTo(db.Product, { foreignKey: "productId" });
