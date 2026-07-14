const bcrypt = require("bcryptjs");
const Court = require("../models/court");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

// =====================
// COURT AUTH
// =====================
async function court_home(req, res) {
    return res.render("court");
}

async function court_register_page(req, res) {
    return res.render("court_register");
}

async function court_register(req, res) {
    const { email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.render("court_register", {
            error: "Passwords do not match"
        });
    }

    const password_hash = bcrypt.hashSync(password, 10);

    Court.createCourt(
        { email, password: password_hash },
        (error) => {
            if (error) {
                return res.render("court_register", {
                    error: "Registration failed"
                });
            }

            // After successful registration, go to common login (JWT-based)
            return res.redirect("/login");
        }
    );
}

// =====================
// COURT APPOINTMENTS
// =====================
async function court_appointments_view(req, res) {
    try {
        const db = mongoose.connection.db;

        const appointments = await db
            .collection("courtappointments")
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        // For frontend fetch()
        if (req.headers.accept && req.headers.accept.includes("application/json")) {
            return res.json({ success: true, appointments });
        }

        return res.render("court_appointments", { appointments });
    }
    catch (error) {
        return res.render("court_appointments", {
            appointments: [],
            error: error.message
        });
    }
}

// =====================
// GET SINGLE APPOINTMENT
// =====================
async function getCourtAppointmentById(req, res) {
    try {
        const { id } = req.params;
        const db = mongoose.connection.db;

        const appointment = await db
            .collection("courtappointments")
            .findOne({ _id: new ObjectId(id) });

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        return res.json({ success: true, appointment });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// =====================
// UPDATE APPOINTMENT
// =====================
async function updateCourtAppointment(req, res) {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const db = mongoose.connection.db;

        updateData.updatedAt = new Date();

        const result = await db
            .collection("courtappointments")
            .findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: updateData },
                { returnDocument: "after" }
            );

        if (!result.value) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        return res.json({
            success: true,
            message: "Appointment updated successfully",
            appointment: result.value
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// =====================
// EXPORTS
// =====================
module.exports = {
    court_home,
    court_register_page,
    court_register,

    court_appointments_view,
    getCourtAppointmentById,
    updateCourtAppointment
};
