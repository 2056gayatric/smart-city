const bcrypt = require("bcryptjs");
const Citizen = require("../models/citizen");

async function citizen_home(req, res) {
    return res.render("citizen_dashboard", {
        citizen: req.user
    });
}

async function citizen_register_page(req, res) {
    return res.render("citizen_register");
}

async function citizen_register(req, res) {
    const {
        first_name,
        last_name,
        username,
        email,
        phone_number,
        password,
        confirm_password,
        gender,
        city
    } = req.body;

    if (password !== confirm_password) {
        return res.render("citizen_register", {
            error: "Passwords do not match"
        });
    }

    const full_name = first_name + " " + last_name;
    const password_hash = bcrypt.hashSync(password, 10);

    Citizen.createCitizen(
        {
            full_name,
            username,
            email,
            phone_number,
            password: password_hash,
            gender,
            city
        },
        (error) => {
            if (error) {
                console.error(error);
                return res.render("citizen_register", {
                    error: "Registration failed"
                });
            }

            return res.redirect("/login");
        }
    );
}

//water complaints
async function Water_Complaints(req, res) {
    return res.render("water");
}

//garbage complaints
async function garbage_complaint(req, res) {
    return res.render("garbage");
}

//electricity complaints
async function electricity_complaint(req, res) {
    return res.render("electricity");
}

//road complaints
async function road_complaint(req, res) {
    return res.render("road");
}

//alerts
async function traffic_alerts(req, res) {
    return res.render("traffic_alerts");
}

async function weather_alerts(req, res) {
    return res.render("weather_alerts");
}

//hospital
async function hospital_appointments(req, res) {
    return res.render("hospital_appointment")
}

//court
async function court_appointments(req, res) {
    return res.render("court_appointments")
}

//Esetu
async function Esetu_appointments(req, res) {
    return res.render("Esetu-appointments")
}

//alerts
//police
async function police_alerts(req, res) {
    return res.render("police_emergency");
}

//ambulance
async function ambulance_alerts(req, res) {
    return res.render("ambulance_emergency");
}

//fire
async function fire_alerts(req, res) {
    return res.render("fire_emergency");
}

module.exports = {
    citizen_home,
    citizen_register_page,
    citizen_register,
    Water_Complaints,
    garbage_complaint,
    electricity_complaint,
    road_complaint,
    traffic_alerts,
    weather_alerts,
    hospital_appointments,
    court_appointments,
    Esetu_appointments,
    police_alerts,
    ambulance_alerts,
    fire_alerts
};
