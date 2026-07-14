const express = require("express");
const router = express.Router();
const {government_home,government_register_page,government_register,water_complaints_view,getComplaintById,updateComplaint,garbage_complaints_view,getGarbageComplaintById,updateGarbageComplaint,electricity_complaints_view,getElectricityComplaintById,updateElectricityComplaint,roads_complaints_view,getRoadsComplaintById,updateRoadsComplaint} = require("../controllers/government");
const { AUTH_MIDDLEWARE, GOVERNMENT_ONLY } = require("../middlewares/auth_middlewares");

// Public routes
router.get("/government_register", government_register_page);
router.post("/government_register", government_register);

// ✅ Protected routes (require authentication)
router.use(AUTH_MIDDLEWARE, GOVERNMENT_ONLY);

// Government dashboard
router.get("/", government_home);

//Water complaints - same route for both HTML and JSON
router.get("/complaints/water", water_complaints_view);
router.get("/complaints/water/:id", getComplaintById);
router.put("/complaints/water/:id", updateComplaint);

//garbage complaints
router.get("/complaints/garbage", garbage_complaints_view);
router.get("/complaints/garbage/:id", getGarbageComplaintById);
router.put("/complaints/garbage/:id", updateGarbageComplaint);

//electricity complaints
router.get("/complaints/electricity", electricity_complaints_view);
router.get("/complaints/electricity/:id", getElectricityComplaintById);
router.put("/complaints/electricity/:id", updateElectricityComplaint);

//roads complaints
router.get("/complaints/road", roads_complaints_view);
router.get("/complaints/road/:id", getRoadsComplaintById);
router.put("/complaints/road/:id", updateRoadsComplaint);

module.exports = router;