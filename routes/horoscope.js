const Horoscope = require("../controllers/horoscope");
const { checkAdmin } = require("../middlewares/adminmiddleware");
const { authenticateToken } = require("../middlewares/auth");
const router = require("express").Router();

router.use(authenticateToken);
router.post("/create-horoscope", [checkAdmin], Horoscope.createHoroscope);

router.post(
  "/create-horoscope-category",
  [checkAdmin],
  Horoscope.createHoroscopeCategory,
);

router.get("/get", Horoscope.getHoroscope);
router.get("/get-horoscope", Horoscope.getAllHoroscope);
router.get("/get/:id", Horoscope.getHoroscopeById);
router.get("/get-horoscope-cat/:id", Horoscope.getHoroscopeCategoryById);
router.post("/add-image/:id", [checkAdmin], Horoscope.addImage);
router.get("/get-horoscope-category", Horoscope.getHoroscopeCategory);

router.post("/update-horoscope/:id", [checkAdmin], Horoscope.updateHoroscope);
router.post(
  "/update-horoscope-category/:id",
  [checkAdmin],
  Horoscope.updateHoroscopeCategory,
);

router.post(
  "/delete-horo-category/:id",
  [checkAdmin],
  Horoscope.deleteHoroscopeCategory,
);
router.post("/delete-horoscope/:id", [checkAdmin], Horoscope.deleteHoroscope);
module.exports = router;
