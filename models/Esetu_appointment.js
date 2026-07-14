const mongoose = require("mongoose");

const EkycAppointmentSchema = new mongoose.Schema(
{
    citizen_full_name:
    {
        type: String,
        required: true,
        trim: true
    },

    citizen_mobile_number:
    {
        type: String,
        required: true,
        match: /^[0-9]{10}$/
    },

    citizen_email:
    {
        type: String,
        default: ""
    },

    service_type:
    {
        type: String,
        required: true
    },

    center_location:
    {
        type: String,
        required: true
    },

    appointment_date:
    {
        type: Date,
        required: true
    },

    appointment_time_slot:
    {
        type: String,
        required: true
    },

    additional_remarks:
    {
        type: String,
        default: ""
    },
    appointment_id:
    {
        type: String,
        default: null
    },

    booking_timestamp:
    {
        type: Date,
        default: Date.now
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("EkycAppointment", EkycAppointmentSchema);
