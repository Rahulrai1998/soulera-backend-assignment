import express from "express";
import db from "./models/index.js";

db.sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced");
});
