const router = require("express").Router();
const CategoryController = require("../controllers/category");
const middleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/adminmiddleware");
const validate = require("../validators/validator");
const { checkCategory } = require("../middlewares/product");

router.use(middleware.authenticateToken);
router.post(
  "/create",
  [adminMiddleware.checkAdmin],
  CategoryController.createCategory,
);
router.get("/get/:id", CategoryController.getCategory);
router.get("/get", CategoryController.getCategories);
router.post(
  "/update/:id",
  [adminMiddleware.checkAdmin],
  CategoryController.updateCategory,
);
router.post(
  "/delete/:id",
  [adminMiddleware.checkAdmin],
  CategoryController.deleteCategory,
);
module.exports = router;
