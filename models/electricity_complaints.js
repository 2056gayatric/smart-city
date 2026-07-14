const mongoose = require("mongoose");

const ELECTRICITY_COMPLAINT_SCHEMA = new mongoose.Schema(
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
        enum: ["address", "gps"],
        required: true
    },

    consumer:
    {
        fullName:
        {
            type: String,
            required: true
        },
        serviceNumber:
        {
            type: String,
            required: true
        },
        meterNumber:
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
            type: String,
            default: null
        }
    },

    connection:
    {
        connectionType:
        {
            type: String,
            enum: ["domestic", "commercial", "industrial"],
            required: true
        },
        provider:
        {
            type: String,
            required: true
        }
    },

    address:
    {
        addressLine:
        {
            type: String,
            required: true
        },
        landmark:
        {
            type: String,
            default: null
        },
        area:
        {
            type: String,
            required: true
        },
        city:
        {
            type: String,
            required: true
        },
        ward:
        {
            type: String,
            required: true
        }
    },

    issue:
    {
        issueType:
        {
            type: String,
            required: true
        },
        issueDate:
        {
            type: String,
            required: true
        },
        issueTime:
        {
            type: String,
            required: true
        },
        duration:
        {
            type: String,
            required: true
        },
        description:
        {
            type: String,
            required: true
        }
    },

    media:
    [
        {
            type: String
        }
    ],

    status:
    {
        type: String,
        default: "pending"
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("ElectricityComplaint", ELECTRICITY_COMPLAINT_SCHEMA);
