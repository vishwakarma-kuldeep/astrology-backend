const Plan = require("../controllers/plans");
const { checkPlan, checkValidPlanId } = require("../middlewares/plan");
const { authenticateToken } = require("../middlewares/auth");
const { checkAdmin } = require("../middlewares/adminmiddleware");
const router = require("express").Router();

router.use(authenticateToken);
router.post("/create", [checkAdmin, checkPlan], Plan.createPlan);
router.post("/update/:id", [checkAdmin, checkValidPlanId], Plan.updatePlan);
router.post("/delete/:id", [checkAdmin, checkValidPlanId], Plan.deletePlan);
router.get("/get/:id", [checkValidPlanId], Plan.planById);
router.get("/get", [Plan.getPlans]);

module.exports = router;
