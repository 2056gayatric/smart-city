const HospitalAppointment = require("../models/hospital_appointment");

const CREATE_HOSPITAL_APPOINTMENT = async (req, res) =>
{
    try
    {
        const appointment = new HospitalAppointment(
        {
            hospitalName: req.body.hospitalName,
            hospitalAddress: req.body.hospitalAddress,
            hospitalContact: req.body.hospitalContact,
            patientName: req.body.patientName,
            age: req.body.age,
            gender: req.body.gender,
            contactNumber: req.body.contactNumber,
            address: req.body.address,
            purpose: req.body.purpose,
            appointmentDate: req.body.appointmentDate,
            timeSlot: req.body.timeSlot
        });

        await appointment.save();

        res.render("appointment_success");
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(
        {
            success: false,
            message: "Failed to book appointment"
        });
    }
};

module.exports =
{
    CREATE_HOSPITAL_APPOINTMENT
};
