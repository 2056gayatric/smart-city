const mongoose = require("mongoose");

const TrainRouteSchema = new mongoose.Schema(
    {
        trainNo: { type: String, required: true },
        coaches: { type: Number, required: true, default: 0 },
        departure: { type: String, default: "" },
        arrival: { type: String, default: "" }
    },
    { timestamps: true }
);

module.exports = mongoose.model("TrainRoute", TrainRouteSchema, "trainroutes");
