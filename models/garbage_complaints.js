const mongoose = require("mongoose");

const GARBAGE_COMPLAINT_SCHEMA = new mongoose.Schema(
{
    complaintId:
    {
        type: String,
        required: true,
        unique: true
    },

    locationMethod:
    {
        type: String,
        enum: ["address"],
        default: "address"
    },

    address:
    {
        street: { type: String, required: true },
        city: { type: String, required: true },
        zipCode: { type: String, required: true },
        ward: { type: String, required: true },
        details: { type: String }
    },

    garbageType:
    {
        type: String,
        enum: ["household", "construction", "plastic", "wet", "overflowing", "other"],
        required: true
    },

    quantity:
    {
        type: String,
        enum: ["small", "large", "spread"],
        required: true
    },

    duration:
    {
        type: String,
        required: true
    },

    issueType:
    {
        type: String,
        enum: ["not_collected", "irregular", "illegal", "smell"],
        required: true
    },

    description:
    {
        type: String,
        required: true
    },

    photoDate:
    {
        type: String,
        required: true
    },

    photoTime:
    {
        type: String,
        required: true
    },

    media:
    [
        {
            fileType: String,
            filePath: String
        }
    ],

    fullName:
    {
        type: String,
        required: true
    },

    phone:
    {
        type: String,
        required: true
    },

    email:
    {
        type: String
    },

    status:
    {
        type: String,
        enum: ["Pending", "In Progress", "Resolved"],
        default: "Pending"
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("GarbageComplaint", GARBAGE_COMPLAINT_SCHEMA);
