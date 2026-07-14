const EkycAppointment = require("../models/Esetu_appointment");

async function bookAppointment(req, res)
{
    try
    {
        const appointment = new EkycAppointment(
        {
            citizen_full_name: req.body.citizen_full_name,
            citizen_mobile_number: req.body.citizen_mobile_number,
            citizen_email: req.body.citizen_email,
            service_type: req.body.service_type,
            center_location: req.body.center_location,
            appointment_date: req.body.appointment_date,
            appointment_time_slot: req.body.appointment_time_slot,
            additional_remarks: req.body.additional_remarks,
            appointment_id: "EKYC-" + Date.now(),
            booking_timestamp: req.body.booking_timestamp
        });

        const savedAppointment = await appointment.save();

        res.render("appointment_success")
    }
    catch(error)
    {
        res.status(400).json(
        {
            success: false,
            message: "Failed to book appointment",
            error: error.message
        });
    }
};

module.exports = { bookAppointment };
