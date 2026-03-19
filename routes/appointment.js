const Appointment = require("../controllers/appointment");
const { checkJyotis } = require("../middlewares/jyotis");
const { checkAppointment } = require("../middlewares/appointment");
const { authenticateToken } = require("../middlewares/auth");
const { checkUser } = require("../middlewares/user");
const { checkAdmin } = require("../middlewares/adminmiddleware");

const router = require("express").Router();
router.use(authenticateToken);
router.post("/book", [checkJyotis, checkUser], Appointment.bookAppointment);
router.get("/my", [checkUser], Appointment.getMyAppointments);
router.get("/all", [checkAdmin], Appointment.getAllAppointments);
router.post(
  "/update-appointment/:id",
  [checkAppointment, checkAdmin],
  Appointment.acceptAppointment,
);
router.post(
  "/cancel/:id",
  [checkAppointment, checkUser],
  Appointment.cancelAppointment,
);
router.post(
  "/cancel-appointment/:id",
  [checkAppointment, checkAdmin],
  Appointment.cancelAppointment,
);
router.get(
  "/get-appointment/:id",
  [checkAppointment, checkAdmin],
  Appointment.getSingleAppointment,
);
router.get("/get-all-count", [checkAdmin], Appointment.getAllAppointmentsCount);
module.exports = router;
