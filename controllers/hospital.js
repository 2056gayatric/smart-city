const bcrypt = require("bcryptjs");
const Hospital = require("../models/hospital");
const HospitalAppointment = require("../models/hospital_appointment");

// =====================
// HOSPITAL AUTH
// =====================
async function hospital_home(req, res)
{
    return res.render("hospital");
}

async function hospital_register_page(req, res)
{
    return res.render("hospital_register");
}

async function hospital_register(req, res)
{
    const { email, password, confirm_password } = req.body;

    if(password !== confirm_password)
    {
        return res.render("hospital_register",
        {
            error: "Passwords do not match"
        });
    }

    const password_hash = bcrypt.hashSync(password, 10);

    Hospital.createHospital(
        {
            email,
            password: password_hash
        },
        (error) =>
        {
            if(error)
            {
                return res.render("hospital_register",
                {
                    error: "Registration failed"
                });
            }

            // After successful registration, go to common login (JWT-based)
            return res.redirect("/login");
        }
    );
}

// =====================
// HOSPITAL APPOINTMENTS
// =====================
async function hospital_appointments_view(req, res)
{
    try
    {
        const appointments = await HospitalAppointment.find({});

        const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
        // 🔁 map ONLY what frontend expects
        const formattedAppointments = appointments.map(app => ({
            _id: app._id,
            fullName: app.patientName,
            age: app.age,
            gender: app.gender,
            contactNumber: app.contactNumber,
            department: app.purpose || "General",

            appointmentDate: app.appointmentDate,
            appointmentTime: app.timeSlot,   // 🔥 MATCH FRONTEND
            urgency: cap(app.urgency) || "Normal",
            status: cap(app.status) || "Pending",
            notes: app.notes || "",

            createdAt: app.createdAt
        }));

        // ✅ SAME AS COURT
        if (req.headers.accept && req.headers.accept.includes("application/json"))
        {
            return res.json({
                success: true,
                appointments: formattedAppointments
            });
        }

        return res.render("hospital", {
            appointments: formattedAppointments
        });
    }
    catch (error)
    {
        return res.json({
            success: false,
            appointments: []
        });
    }
}

async function getHospitalAppointmentById(req, res)
{
    const appointment = await HospitalAppointment.findById(req.params.id);
    return res.json(appointment);
}

async function updateHospitalAppointment(req, res)
{
    try
    {
        const { id } = req.params;
        const { status, urgency, appointmentDate, appointmentTime, notes } = req.body;

        const updateData = {};
        if (status !== undefined) updateData.status = String(status).toLowerCase();
        if (urgency !== undefined) updateData.urgency = urgency;
        if (appointmentDate !== undefined) updateData.appointmentDate = appointmentDate;
        if (appointmentTime !== undefined) updateData.timeSlot = appointmentTime;
        if (notes !== undefined) updateData.notes = notes;

        const updated = await HospitalAppointment.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updated)
        {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
        return res.json({
            success: true,
            message: "Appointment updated successfully",
            appointment: {
                _id: updated._id,
                fullName: updated.patientName,
                age: updated.age,
                department: updated.purpose,
                appointmentDate: updated.appointmentDate,
                appointmentTime: updated.timeSlot,
                urgency: updated.urgency || "Normal",
                status: cap(updated.status),
                notes: updated.notes
            }
        });
    }
    catch (error)
    {
        console.error("Hospital appointment update error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to update appointment"
        });
    }
}

module.exports =
{
    hospital_home,
    hospital_register_page,
    hospital_register,
    hospital_appointments_view,
    getHospitalAppointmentById,
    updateHospitalAppointment,
};
