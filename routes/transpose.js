const express = require("express");
const router = express.Router();
const {
    Transpose_home,
    Bus_transpose_home,
    Train_transpose_home,
    metro_transpose_home,
    transport_register,
    transpose_register_page,
    getBusRoutes,
    createBusRoute,
    updateBusRoute,
    deleteBusRoute,
    getTrainRoutes,
    createTrainRoute,
    updateTrainRoute,
    deleteTrainRoute,
    getMetroRoutes,
    createMetroRoute,
    updateMetroRoute,
    deleteMetroRoute
} = require("../controllers/transpose");
const { AUTH_MIDDLEWARE, TRANSPORT_ONLY } = require("../middlewares/auth_middlewares");

// Public
router.get("/transpose_register", transpose_register_page);
router.post("/transpose_register", transport_register);

// Protected (JWT)
router.use(AUTH_MIDDLEWARE, TRANSPORT_ONLY);
router.get("/", Transpose_home);
router.get("/bus", Bus_transpose_home);
router.get("/train", Train_transpose_home);
router.get("/metro", metro_transpose_home);

// Bus API
router.get("/api/bus/routes", getBusRoutes);
router.post("/api/bus/routes", createBusRoute);
router.put("/api/bus/routes/:id", updateBusRoute);
router.delete("/api/bus/routes/:id", deleteBusRoute);

// Train API
router.get("/api/train/routes", getTrainRoutes);
router.post("/api/train/routes", createTrainRoute);
router.put("/api/train/routes/:id", updateTrainRoute);
router.delete("/api/train/routes/:id", deleteTrainRoute);

// Metro API
router.get("/api/metro/routes", getMetroRoutes);
router.post("/api/metro/routes", createMetroRoute);
router.put("/api/metro/routes/:id", updateMetroRoute);
router.delete("/api/metro/routes/:id", deleteMetroRoute);

module.exports = router;