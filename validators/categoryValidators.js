const { body } = require("express-validator");

const categoryRules = [
  body("name").trim().notEmpty().withMessage("Category name is required"),
  body("description").optional().isString().withMessage("Description must be text")
];

module.exports = { categoryRules };