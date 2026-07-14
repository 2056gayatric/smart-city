const express = require("express");
const router = express.Router();

const {
    court_home,
    court_register_page,
    court_register,
    court_appointments_view,
    getCourtAppointmentById,
    updateCourtAppointment
} = require("../controllers/court");

const {
    AUTH_MIDDLEWARE,
    COURT_ONLY
} = require("../middlewares/auth_middlewares");

// =====================
// COURT AUTH
// =====================
router.get("/court_register", court_register_page);
router.post("/court_register", court_register);

// =====================
// PROTECTED COURT ROUTES
// =====================
router.use(AUTH_MIDDLEWARE, COURT_ONLY);

router.get("/", court_home);

router.get("/appointments", court_appointments_view);
router.get("/appointments/:id", getCourtAppointmentById);
router.put("/appointments/:id", updateCourtAppointment);

module.exports = router;
