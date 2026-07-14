const mongoose = require("mongoose");

const AmbulanceRequestSchema = new mongoose.Schema(
{
    address:
    {
        type: String,
        required: true,
        trim: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("AmbulanceRequest", AmbulanceRequestSchema);
