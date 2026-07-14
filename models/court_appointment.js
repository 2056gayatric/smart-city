const mongoose = require("mongoose");

const APPOINTMENT_SCHEMA = new mongoose.Schema(
{
    fullName:
    {
        type: String,
        required: true,
        trim: true
    },

    dob:
    {
        type: Date,
        required: true
    },

    gender:
    {
        type: String,
        enum: ["male", "female", "other"],
        required: true
    },

    idType:
    {
        type: String,
        enum: ["aadhaar", "pan", "passport", "other"],
        required: true
    },

    idNumber: { type: String, default: null },

    mobile:
    {
        type: String,
        required: true,
        match: /^[0-9]{10}$/
    },

    email:
    {
        type: String,
        default: null
    },

    address:
    {
        type: String,
        required: true
    },

    caseTypes:
{
    type: [String],
    enum: ["civil", "criminal", "family", "labour", "property", "motor", "other"],
    default: []
},


    appointmentDate:
    {
        type: Date,
        required: true
    },

    timeSlot:
    {
        type: String,
        required: true
    },

    status:
    {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },

    appointmentId:
    {
        type: String,
        unique: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("CourtAppointment", APPOINTMENT_SCHEMA);
