const productController = require("../controllers/product");
const middleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/adminmiddleware");
const product = require("../middlewares/product");
const router = require("express").Router();

router.post("/add", [adminMiddleware.checkAdmin], productController.addProduct);
router.post(
  "/update/:id",
  [adminMiddleware.checkAdmin],
  productController.updateProduct,
);

router.post(
  "/delete/:id",
  [adminMiddleware.checkAdmin],
  productController.deleteProduct,
);
router.get(
  "/get-deleted-products",
  [adminMiddleware.checkAdmin],
  productController.getAllDeletedProducts,
);

router.post(
  "/add-image/:id",
  [adminMiddleware.checkAdmin],
  productController.addImage,
);

router.post(
  "/remove-image/:id",
  [adminMiddleware.checkAdmin],
  productController.removeImage,
);

router.post(
  "/add-discount/:id",
  [adminMiddleware.checkAdmin, product.checkProduct],
  productController.addDiscount,
);
router.get(
  "/get-all",
  [middleware.authenticateToken],
  productController.getAllProducts,
);
router.get(
  "/get/:id",
  [product.checkProduct],
  productController.getProductById,
);
router.post(
  "/retrieve-products",
  [adminMiddleware.checkAdmin],
  productController.retrieveProducts,
);

// Get Products by category
router.get(
  "/get-by-category/:id",
  [product.checkCategory],
  productController.getProductsByCategory,
);
// Get Products by subcategory
// router.get(
//   '/get-by-subcategory/:id',
//   [   product.checkSubCategory],
//   productController.getProductsBySubCategory,
// )

// Get New Arrivals
router.get(
  "/get-new-arrivals",
  [middleware.authenticateToken],
  productController.getNewArrivals,
);
// get total products
router.get(
  "/get-total-products",
  [adminMiddleware.checkAdmin],
  productController.getTotalProducts,
);

// Carousel Products
router.get(
  "/get-carousel-products",
  [middleware.authenticateToken],
  productController.getProductsForCarousel,
);

router.post(
  "/add-to-carousel",
  [adminMiddleware.checkAdmin, product.checkProduct],
  productController.addProductsToCarousel,
);
// hide or remove from carousel
router.post(
  "/remove-from-carousel",
  [adminMiddleware.checkAdmin, product.checkProduct],
  productController.deleteProductsFromCarouselOrHide,
);

router.get(
  "/search",
  [middleware.authenticateToken],
  productController.searchProducts,
);
router.post(
  "/get-similar-products",
  [middleware.authenticateToken],
  productController.getSimilarProducts,
);
router.get(
  "/get-all-trending-products",
  [middleware.authenticateToken],
  productController.getAllTrendingProducts,
);

module.exports = router;
