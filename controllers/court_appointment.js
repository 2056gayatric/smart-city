const Appointment = require("../models/court_appointment");

const CREATE_COURT_APPOINTMENT = async (req, res) =>
{
    try
    {
        const appointment = new Appointment(
        {
            appointmentId: "APT-" + Date.now(),

            fullName: req.body.fullName || null,
            dob: req.body.dob || null,
            gender: req.body.gender || null,

            idType: req.body.idType || null,

            idNumber: req.body.idNumber || null,

            mobile: req.body.mobile || null,
            email: req.body.email || null,
            address: req.body.address || null,

            caseTypes: req.body.caseTypes
                ? Array.isArray(req.body.caseTypes)
                    ? req.body.caseTypes
                    : [req.body.caseTypes]
                : [],

            otherCaseType: req.body.otherCaseType || null,

            caseStatus: req.body.caseStatus || null,
            caseNumber: req.body.caseNumber || null,

            role: req.body.role
                ? Array.isArray(req.body.role)
                    ? req.body.role
                    : [req.body.role]
                : [],

            purpose: req.body.purpose
                ? Array.isArray(req.body.purpose)
                    ? req.body.purpose
                    : [req.body.purpose]
                : [],

            otherPurpose: req.body.otherPurpose || null,

            advocateName: req.body.advocateName || null,

            appointmentDate: req.body.appointmentDate || null,
            timeSlot: req.body.timeSlot || null
        });

        await appointment.save();

        res.render("appointment_success");
    }
   catch (error)
{
    console.error("COURT APPOINTMENT ERROR:", error);

    res.status(500).json(
    {
        success: false,
        message: "Failed to book court appointment",
        error: error.message
    });
}

};

module.exports =
{
    CREATE_COURT_APPOINTMENT
};
