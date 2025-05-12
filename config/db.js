import { Sequelize } from "sequelize";

// Create Sequelize instance and connect to PostgreSQL
const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "yourUsername",
  password: "yourPassword",
  database: "yourDatabase",
  logging: false, // Optional: Disable logging for production
});

export default db = {
  sequelize,
  Sequelize,
  User: require("./models/User")(sequelize, Sequelize.DataTypes),
  Category: require("./models/Category")(sequelize, Sequelize.DataTypes),
  Product: require("./models/Product")(sequelize, Sequelize.DataTypes),
  Order: require("./models/Order")(sequelize, Sequelize.DataTypes),
  OrderItem: require("./models/OrderItem")(sequelize, Sequelize.DataTypes),
};
