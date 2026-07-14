const mongoose = require("mongoose");

const BusRouteSchema = new mongoose.Schema(
    {
        routeNo: { type: String, required: true },
        vehicleCount: { type: Number, required: true, default: 0 },
        departure: { type: String, default: "" },
        arrival: { type: String, default: "" }
    },
    { timestamps: true }
);

module.exports = mongoose.model("BusRoute", BusRouteSchema, "busroutes");
