const bcrypt = require("bcryptjs");
const { Role, OrderStatus } = require("./enums");
const { db } = require("./models"); // Import Sequelize models

import { Role, OrderStatus } from "./enums";
import db from "./config/db";

export const Query = {
  // Get all users
  users: async () => {
    return await db.User.findAll();
  },

  // Get a specific user by ID
  user: async (_, { id }) => {
    return await db.User.findByPk(id);
  },

  // Get all categories
  categories: async () => {
    return await db.Category.findAll();
  },

  // Get a specific category by ID
  category: async (_, { id }) => {
    return await db.Category.findByPk(id);
  },

  // Get all products
  products: async () => {
    return await db.Product.findAll();
  },

  // Get a specific product by ID
  product: async (_, { id }) => {
    return await db.Product.findByPk(id);
  },

  // Get all orders
  orders: async () => {
    return await db.Order.findAll();
  },

  // Get a specific order by ID
  order: async (_, { id }) => {
    return await db.Order.findByPk(id);
  },

  // Get order items for a specific order
  orderItems: async (_, { orderId }) => {
    return await db.OrderItem.findAll({
      where: { orderId },
    });
  },
};

export const Mutation = {
  // Create a new user
  createUser: async (_, { input }) => {
    const {
      email,
      password,
      firstName,
      lastName,
      role = Role.CUSTOMER,
    } = input;

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
    });

    return newUser;
  },

  // Update an existing user
  updateUser: async (_, { id, input }) => {
    const user = await db.User.findByPk(id);

    if (!user) {
      throw new Error("User not found");
    }

    if (input.password) {
      input.password = await bcrypt.hash(input.password, 10);
    }

    await user.update(input);

    return user;
  },

  // Delete a user
  deleteUser: async (_, { id }) => {
    const user = await db.User.findByPk(id);

    if (!user) {
      throw new Error("User not found");
    }

    await user.destroy();

    return true;
  },

  // Create a new category
  createCategory: async (_, { input }) => {
    const newCategory = await db.Category.create(input);
    return newCategory;
  },

  // Update an existing category
  updateCategory: async (_, { id, input }) => {
    const category = await db.Category.findByPk(id);

    if (!category) {
      throw new Error("Category not found");
    }

    await category.update(input);

    return category;
  },

  // Delete a category
  deleteCategory: async (_, { id }) => {
    const category = await db.Category.findByPk(id);

    if (!category) {
      throw new Error("Category not found");
    }

    await category.destroy();

    return true;
  },

  // Create a new product
  createProduct: async (_, { input }) => {
    const newProduct = await db.Product.create(input);
    return newProduct;
  },

  // Update an existing product
  updateProduct: async (_, { id, input }) => {
    const product = await db.Product.findByPk(id);

    if (!product) {
      throw new Error("Product not found");
    }

    await product.update(input);

    return product;
  },

  // Delete a product
  deleteProduct: async (_, { id }) => {
    const product = await db.Product.findByPk(id);

    if (!product) {
      throw new Error("Product not found");
    }

    await product.destroy();

    return true;
  },

  // Create a new order
  createOrder: async (_, { input }) => {
    const { userId, status = OrderStatus.PENDING, items } = input;

    const newOrder = await db.Order.create({
      userId,
      status,
      totalAmount: items.reduce(
        (total, item) => total + item.unitPrice * item.quantity,
        0
      ),
    });

    for (const item of items) {
      await db.OrderItem.create({
        orderId: newOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      });
    }

    return newOrder;
  },

  // Update the status of an order
  updateOrderStatus: async (_, { id, input }) => {
    const order = await db.Order.findByPk(id);

    if (!order) {
      throw new Error("Order not found");
    }

    await order.update({ status: input.status });

    return order;
  },

  // Delete an order
  deleteOrder: async (_, { id }) => {
    const order = await db.Order.findByPk(id);

    if (!order) {
      throw new Error("Order not found");
    }

    await order.destroy();

    return true;
  },
};
