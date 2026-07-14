const mongoose = require("mongoose");

const EmergencyAlertSchema = new mongoose.Schema(
{
    address:
    {
        type: String,
        required: true,
        trim: true
    },

    city:
    {
        type: String,
        required: true,
        trim: true
    },

    landmark:
    {
        type: String,
        trim: true
    },

    alertId:
    {
        type: String,
        required: true
    },

    status:
    {
        type: String,
        default: "Processing"
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("EmergencyAlert", EmergencyAlertSchema);
