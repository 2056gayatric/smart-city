const express = require("express");
const router = express.Router();

const
{
    hospital_home,
    hospital_register_page,
    hospital_register,
    hospital_appointments_view,
    getHospitalAppointmentById,
    updateHospitalAppointment,
} = require("../controllers/hospital");

const
{
    AUTH_MIDDLEWARE,
    HOSPITAL_ONLY
} = require("../middlewares/auth_middlewares");

// =====================
// HOSPITAL AUTH
// =====================
router.get("/hospital_register", hospital_register_page);
router.post("/hospital_register", hospital_register);

// =====================
// PROTECTED HOSPITAL ROUTES
// =====================
router.use(AUTH_MIDDLEWARE, HOSPITAL_ONLY);

router.get("/", hospital_home);

router.get("/appointments", hospital_appointments_view);
router.get("/appointments/:id", getHospitalAppointmentById);
router.put("/appointments/:id", updateHospitalAppointment);

module.exports = router;
