const { body } = require("express-validator");

const courseRules = [
  body("title").trim().notEmpty().withMessage("Course title is required"),
  body("instructor").trim().notEmpty().withMessage("Instructor is required"),
  body("price").exists().withMessage("Price is required").bail().isFloat({ min: 0 }).withMessage("Price must be a non-negative number"),
  body("category").trim().notEmpty().withMessage("A valid category ID is required"),
  body("description").optional().isString().withMessage("Description must be text")
];

module.exports = { courseRules };