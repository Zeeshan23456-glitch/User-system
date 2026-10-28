const categories = require("../models/Category");
const courses = require("../models/Course");
const { id, timestamps } = require("../models/store");
const validId = value => typeof value === "string" && value.length > 0;
exports.createCategory = async (req, res) => {
  const name = req.body.name.trim();
  if (categories.some(c => c.name.toLowerCase() === name.toLowerCase())) return res.status(409).json({ message: "Category name already exists" });
  const category = { id: id(), name, description: req.body.description || "", ...timestamps() };
  categories.push(category); return res.status(201).json({ message: "Category created", category });
};
exports.getCategories = async (req, res) => { const list = [...categories].sort((a,b) => b.createdAt.localeCompare(a.createdAt)); return res.status(200).json({ count: list.length, categories: list }); };
exports.getCategoryById = async (req, res) => { const category = categories.find(c => c.id === req.params.id); if (!category) return res.status(404).json({ message: "Category not found" }); return res.status(200).json({ category }); };
exports.updateCategory = async (req, res) => { const category = categories.find(c => c.id === req.params.id); if (!category) return res.status(404).json({ message: "Category not found" }); const name = req.body.name.trim(); if (categories.some(c => c.id !== category.id && c.name.toLowerCase() === name.toLowerCase())) return res.status(409).json({ message: "Category name already exists" }); category.name = name; category.description = req.body.description || ""; category.updatedAt = new Date().toISOString(); return res.status(200).json({ message: "Category updated", category }); };
exports.deleteCategory = async (req, res) => { const category = categories.find(c => c.id === req.params.id); if (!category) return res.status(404).json({ message: "Category not found" }); if (courses.some(c => c.category === category.id)) return res.status(409).json({ message: "Cannot delete a category that has courses" }); categories.splice(categories.indexOf(category), 1); return res.status(200).json({ message: "Category deleted" }); };
