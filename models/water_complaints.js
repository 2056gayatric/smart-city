const mongoose = require("mongoose");

const WATER_COMPLAINT_SCHEMA = new mongoose.Schema(
{
    complaintId: {
        type: String,
        required: true,
        unique: true
    },

    gpsAddress: {
        type: String,
        default: null
    },

    address: {
        houseNo: String,
        street: String,
        ward: String,
        city: String,
        pincode: String,
        landmark: String
    },

    issueType: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    issueDate: {
        type: String
    },

    issueTime: {
        type: String
    },

    duration: {
        type: String
    },

    fullName: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    email: {
        type: String
    },

    media: [{
        fileName: String,
        filePath: String,
        fileType: String
    }],

    status: {
        type: String,
        default: "Pending"
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("WaterComplaint", WATER_COMPLAINT_SCHEMA);