const mongoose = require("mongoose");

const ROAD_COMPLAINT_SCHEMA = new mongoose.Schema(
{
    complaintId:
    {
        type: String,
        required: true,
        unique: true
    },

    address:
    {
        roadName:
        {
            type: String,
            required: true
        },
        area:
        {
            type: String,
            required: true
        },
        ward:
        {
            type: String,
            required: true
        },
        city:
        {
            type: String,
            required: true
        },
        pincode:
        {
            type: String,
            required: true
        },
        landmark:
        {
            type: String,
            default: null
        }
    },

    issue:
    {
        issueType:
        {
            type: String,
            required: true
        },
        securityLevel:
        {
            type: String,
            enum: ["minor", "moderate", "dangerous"],
            required: true
        },
        affectedArea:
        {
            type: String,
            enum: ["small", "large"],
            required: true
        },
        duration:
        {
            value:
            {
                type: Number,
                required: true
            },
            unit:
            {
                type: String,
                enum: ["days", "weeks", "months"],
                required: true
            }
        },
        monsoonIssue:
        {
            type: String,
            default: null
        },
        remarks:
        {
            type: String,
            default: null
        }
    },

    capture:
    {
        date:
        {
            type: String,
            required: true
        },
        time:
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

module.exports = mongoose.model("RoadComplaint", ROAD_COMPLAINT_SCHEMA);
