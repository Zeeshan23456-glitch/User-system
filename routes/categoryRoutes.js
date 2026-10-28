const router = require("express").Router();
const controller = require("../controllers/categoryController");
const { protect } = require("../middleware/authMiddleware");
const { categoryRules } = require("../validators/categoryValidators");
const validate = require("../middleware/validate");

router.use(protect);
router.route("/")
  .post(categoryRules, validate, controller.createCategory)
  .get(controller.getCategories);
router.route("/:id")
  .get(controller.getCategoryById)
  .put(categoryRules, validate, controller.updateCategory)
  .delete(controller.deleteCategory);

module.exports = router;