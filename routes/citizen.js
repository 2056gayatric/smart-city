const express = require("express");
const router = express.Router();
const UPLOAD = require("../middlewares/uploads_middlewares");
const multer = require("multer");

const upload = multer(); // memory storage

const {citizen_home,citizen_register_page,citizen_register,Water_Complaints,garbage_complaint,electricity_complaint,road_complaint,traffic_alerts,weather_alerts,hospital_appointments,court_appointments,Esetu_appointments,police_alerts,ambulance_alerts,fire_alerts} = require("../controllers/citizen");
const {CREATE_WATER_COMPLAINT}=require("../controllers/water_complaints");
const {CREATE_GARBAGE_COMPLAINT}=require("../controllers/garbage_comlaints");
const {CREATE_ELECTRICITY_COMPLAINT}=require("../controllers/electricity_complaints");
const {CREATE_ROAD_COMPLAINT}=require("../controllers/roads_complaints");
const {CREATE_HOSPITAL_APPOINTMENT}=require("../controllers/hospital_appoitnment")
const {CREATE_COURT_APPOINTMENT}=require("../controllers/court_appointment")
const {bookAppointment}=require("../controllers/Esetu_appointment")
const {CREATE_EMERGENCY_ALERT_police}=require("../controllers/police_emergency")
const {CREATE_AMBULANCE_REQUEST}=require("../controllers/ambulance_emergency")
const {CREATE_FIRE_EMERGENCY_REQUEST}=require("../controllers/fire_emergency")
const {park,housing,swimming,ground} = require("../controllers/servies")
const {bus} = require("../controllers/bus")
const {train} = require("../controllers/train")
const {metro} = require("../controllers/metro")
const {AUTH_MIDDLEWARE,CITIZEN_ONLY}=require("../middlewares/auth_middlewares")

//home and register
router.get("/citizen_register", citizen_register_page);
router.post("/citizen_register", citizen_register);

router.use(AUTH_MIDDLEWARE, CITIZEN_ONLY);
router.get("/", citizen_home);

//water
router.get("/complaints/water",Water_Complaints)
router.post("/complaints/water",UPLOAD.array("media", 5),CREATE_WATER_COMPLAINT);

//garbage
router.get("/complaints/garbage",garbage_complaint)
router.post("/complaints/garbage",UPLOAD.array("media", 5),CREATE_GARBAGE_COMPLAINT);

//electricity
router.get("/complaints/electricity",electricity_complaint)
router.post("/complaints/electricity",UPLOAD.array("media", 5),CREATE_ELECTRICITY_COMPLAINT);

//roads
router.get("/complaints/roads",road_complaint)
router.post("/complaints/roads",UPLOAD.array("media", 5),CREATE_ROAD_COMPLAINT);

//alerts
router.get("/alerts/traffic",traffic_alerts)
router.get("/alerts/weather",weather_alerts)

//appointments
//hospital
router.get("/appointments/hospital",hospital_appointments)
router.post("/appointments/hospital", CREATE_HOSPITAL_APPOINTMENT);

//court
router.get("/appointments/court",court_appointments)
router.post("/appointments/court",CREATE_COURT_APPOINTMENT);

//E-setu
router.get("/appointments/Esetu",Esetu_appointments)
router.post("/appointments/Esetu",upload.none(),bookAppointment);

//alerts
//police
router.get("/emergency/police",police_alerts)
router.post("/emergency/police",CREATE_EMERGENCY_ALERT_police);

//ambulance
router.get("/emergency/ambulance",ambulance_alerts)
router.post("/emergency/ambulance",CREATE_AMBULANCE_REQUEST)

//fire
router.get("/emergency/fire",fire_alerts)
router.post("/emergency/fire",CREATE_FIRE_EMERGENCY_REQUEST)

//booking
//bus
router.get("/transport/bus",bus)

//train
router.get("/transport/train",train)

//metro
router.get("/transport/metro",metro)

//services
router.get("/locator/park",park)
router.get("/locator/ground",ground)
router.get("/locator/swimming",swimming)
router.get("/locator/housing",housing)

module.exports = router;