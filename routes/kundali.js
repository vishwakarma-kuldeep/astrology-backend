const router = require("express").Router();
const { authenticateToken } = require("../middlewares/auth");
const { checkUser } = require("../middlewares/user");
const { checkAdmin } = require("../middlewares/adminmiddleware");

const Kundali = require("../controllers/kundali");
const { checkKundaliDetails } = require("../middlewares/kundali");

router.use(authenticateToken);
router.post("/create", [checkUser, checkKundaliDetails], Kundali.createKundali);
router.get("/get", [checkUser], Kundali.getKundali);
router.get("/get/:id", [checkUser], Kundali.getKundaliById);
router.get("/get-all", [checkAdmin], Kundali.getAllKundali);

router.post("/update/:id", [checkUser], Kundali.updateKundali);
router.post(
  "/ask-question",
  [checkUser, checkKundaliDetails],
  Kundali.askQuestion,
);
router.post("/answer-question/:id", [checkAdmin], Kundali.replyQuestion);
module.exports = router;
