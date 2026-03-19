const router = require("express").Router();
const userController = require("../controllers/users");
const adminController = require("../controllers/admin");
const middleware = require("../middlewares/auth");
const { checkProduct } = require("../middlewares/product");
const validator = require("../validators/validator");
const { checkAdmin } = require("../middlewares/adminmiddleware");
// Get routes
router.post("/signup", [validator.validateEmail], userController.signup);
router.post(
  "/authenticate",
  [validator.authenticate],
  userController.authenticate,
);

router.use(middleware.authenticateToken);

router.get("/get", userController.getProfile);
router.get("/verify-token", userController.veryfyToken);

// Post routes
router.post("/update", userController.updateProfile);

// Add product to wishlist
router.post("/add-to-wishlist", [checkProduct], userController.addToWishlist);
// remove product from wishlist
router.post(
  "/remove-from-wishlist",
  [checkProduct],
  userController.removeFromWishlist,
);
// Get wishlist
router.get("/get-wishlist", userController.getWishlist);

// Admin routes
router.get("/get-all", [checkAdmin], userController.getAllUsers);
router.get("/get-all-count", [checkAdmin], userController.getAllUsersCount);
router.post("/delete/:id", [checkAdmin], userController.deleteUser);

router.post("/create-user", [checkAdmin], adminController.createUser);
// getMostproductsPurchasedUsers

router.get(
  "/get-most-products-purchased-users",
  [checkAdmin],
  userController.getMostproductsPurchasedUsers,
);

module.exports = router;
