const mongoose = require("mongoose");

const MetroRouteSchema = new mongoose.Schema(
    {
        lineNo: { type: String, required: true },
        trains: { type: Number, required: true, default: 0 },
        startTime: { type: String, default: "" },
        endTime: { type: String, default: "" }
    },
    { timestamps: true }
);

module.exports = mongoose.model("MetroRoute", MetroRouteSchema, "metroroutes");
