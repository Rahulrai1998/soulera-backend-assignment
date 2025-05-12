import { gql } from "apollo-server-express";

export default typeDefs = gql`
  # === Enums ===
  
  enum Role {
    ADMIN
    CUSTOMER
  }

  enum OrderStatus {
    PENDING
    PROCESSING
    SHIPPED
    DELIVERED
    CANCELLED
  }

  # === Types ===

  type User {
    id: ID!
    email: String!
    firstName: String
    lastName: String
    role: Role!
    createdAt: String!
    updatedAt: String!
    orders: [Order!]!
  }

  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    inventory: Int!
    category: Category!
    createdAt: String!
    updatedAt: String!
  }

  type Category {
    id: ID!
    name: String!
    description: String
    products: [Product!]!
    createdAt: String!
    updatedAt: String!
  }

  type Order {
    id: ID!
    user: User!
    status: OrderStatus!
    totalAmount: Float!
    items: [OrderItem!]!
    createdAt: String!
    updatedAt: String!
  }

  type OrderItem {
    id: ID!
    order: Order!
    product: Product!
    quantity: Int!
    unitPrice: Float!
    createdAt: String!
    updatedAt: String!
  }

  # === Input Types ===

  input CreateUserInput {
    email: String!
    password: String!
    firstName: String
    lastName: String
    role: Role = CUSTOMER
  }

  input UpdateUserInput {
    email: String
    password: String
    firstName: String
    lastName: String
    role: Role
  }

  input CreateCategoryInput {
    name: String!
    description: String
  }

  input UpdateCategoryInput {
    name: String
    description: String
  }

  input CreateProductInput {
    name: String!
    description: String
    price: Float!
    inventory: Int!
    categoryId: ID!
  }

  input UpdateProductInput {
    name: String
    description: String
    price: Float
    inventory: Int
    categoryId: ID
  }

  input CreateOrderInput {
    userId: ID!
    status: OrderStatus = PENDING
    items: [CreateOrderItemInput!]!
  }

  input CreateOrderItemInput {
    productId: ID!
    quantity: Int!
    unitPrice: Float!
  }

  input UpdateOrderStatusInput {
    status: OrderStatus!
  }

  # === Queries ===

  type Query {
    # Users
    users: [User!]!
    user(id: ID!): User

    # Categories
    categories: [Category!]!
    category(id: ID!): Category

    # Products
    products: [Product!]!
    product(id: ID!): Product

    # Orders
    orders: [Order!]!
    order(id: ID!): Order

    # OrderItems (optional)
    orderItems(orderId: ID!): [OrderItem!]!
  }

  # === Mutations ===

  type Mutation {
    # Users
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!

    # Categories
    createCategory(input: CreateCategoryInput!): Category!
    updateCategory(id: ID!, input: UpdateCategoryInput!): Category!
    deleteCategory(id: ID!): Boolean!

    # Products
    createProduct(input: CreateProductInput!): Product!
    updateProduct(id: ID!, input: UpdateProductInput!): Product!
    deleteProduct(id: ID!): Boolean!

    # Orders
    createOrder(input: CreateOrderInput!): Order!
    updateOrderStatus(id: ID!, input: UpdateOrderStatusInput!): Order!
    deleteOrder(id: ID!): Boolean!
  }
`;
