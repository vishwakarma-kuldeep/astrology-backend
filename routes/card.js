const Card = require("../controllers/card");
const { checkAdmin } = require("../middlewares/adminmiddleware");
const { authenticateToken } = require("../middlewares/auth");
const { checkCategoryId } = require("../middlewares/horoscope");
const { checkCardId } = require("../middlewares/card");
const router = require("express").Router();

router.use(authenticateToken);
router.post("/create-card", [checkAdmin, checkCategoryId], Card.createCard);

router.get("/get-card/:id", [checkCardId], Card.getCard);
router.get("/get-cards", [authenticateToken], Card.getAllCards);
router.post("/get-card-by-cat/:id", [checkCategoryId], Card.getCardsWithCatId);
router.post(
  "/update-card/:id",
  [checkAdmin, checkCategoryId, checkCardId],
  Card.updateCard,
);
router.post("/delete-card/:id", [checkAdmin, checkCardId], Card.deleteCard);

router.post("/add-image/:id", [checkAdmin, checkCardId], Card.addImage);
module.exports = router;
