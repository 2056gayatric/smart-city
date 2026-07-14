const mongoose = require("mongoose");

const FireEmergencySchema = new mongoose.Schema(
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

module.exports = mongoose.model("fire_emergency", FireEmergencySchema);
