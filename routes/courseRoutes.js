const router = require("express").Router();
const controller = require("../controllers/courseController");
const { protect } = require("../middleware/authMiddleware");
const { courseRules } = require("../validators/courseValidators");
const validate = require("../middleware/validate");

router.use(protect);
router.route("/")
  .post(courseRules, validate, controller.createCourse)
  .get(controller.getCourses);
router.route("/:id")
  .get(controller.getCourseById)
  .put(courseRules, validate, controller.updateCourse)
  .delete(controller.deleteCourse);

module.exports = router;