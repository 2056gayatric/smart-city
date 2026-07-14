const bcrypt = require("bcryptjs");
const Transport = require("../models/transpose");
const BusRoute = require("../models/bus_route");
const TrainRoute = require("../models/train_route");
const MetroRoute = require("../models/metro_route");

async function Transpose_home(req, res) {
    return res.render("transport_home_page");
}

async function transpose_register_page(req, res) {
    return res.render("transport_register");
}

async function Bus_transpose_home(req, res) {
    return res.render("bus_dashboard");
}

async function Train_transpose_home(req, res) {
    return res.render("train_dashboard");
}

async function metro_transpose_home(req, res) {
    return res.render("metro_dashboard");
}

// ========== BUS ROUTES API ==========
async function getBusRoutes(req, res) {
    try {
        const routes = await BusRoute.find({}).sort({ createdAt: -1 });
        return res.json({ success: true, routes });
    } catch (err) {
        console.error(err);
        return res.json({ success: false, routes: [] });
    }
}

async function createBusRoute(req, res) {
    try {
        const { routeNo, vehicleCount, departure, arrival } = req.body;
        const route = new BusRoute({ routeNo, vehicleCount, departure, arrival });
        await route.save();
        return res.json({ success: true, route });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message });
    }
}

async function updateBusRoute(req, res) {
    try {
        const route = await BusRoute.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!route) return res.status(404).json({ success: false, message: "Not found" });
        return res.json({ success: true, route });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message });
    }
}

async function deleteBusRoute(req, res) {
    try {
        await BusRoute.findByIdAndDelete(req.params.id);
        return res.json({ success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message });
    }
}

// ========== TRAIN ROUTES API ==========
async function getTrainRoutes(req, res) {
    try {
        const routes = await TrainRoute.find({}).sort({ createdAt: -1 });
        return res.json({ success: true, routes });
    } catch (err) {
        console.error(err);
        return res.json({ success: false, routes: [] });
    }
}

async function createTrainRoute(req, res) {
    try {
        const { trainNo, coaches, departure, arrival } = req.body;
        const route = new TrainRoute({ trainNo, coaches, departure, arrival });
        await route.save();
        return res.json({ success: true, route });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message });
    }
}

async function updateTrainRoute(req, res) {
    try {
        const route = await TrainRoute.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!route) return res.status(404).json({ success: false, message: "Not found" });
        return res.json({ success: true, route });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message });
    }
}

async function deleteTrainRoute(req, res) {
    try {
        await TrainRoute.findByIdAndDelete(req.params.id);
        return res.json({ success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message });
    }
}

// ========== METRO ROUTES API ==========
async function getMetroRoutes(req, res) {
    try {
        const routes = await MetroRoute.find({}).sort({ createdAt: -1 });
        return res.json({ success: true, routes });
    } catch (err) {
        console.error(err);
        return res.json({ success: false, routes: [] });
    }
}

async function createMetroRoute(req, res) {
    try {
        const { lineNo, trains, startTime, endTime } = req.body;
        const route = new MetroRoute({ lineNo, trains, startTime, endTime });
        await route.save();
        return res.json({ success: true, route });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message });
    }
}

async function updateMetroRoute(req, res) {
    try {
        const route = await MetroRoute.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!route) return res.status(404).json({ success: false, message: "Not found" });
        return res.json({ success: true, route });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message });
    }
}

async function deleteMetroRoute(req, res) {
    try {
        await MetroRoute.findByIdAndDelete(req.params.id);
        return res.json({ success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message });
    }
}

async function transport_register(req, res)
{
    const {
        email,
        password,
        confirm_password
    } = req.body;

    if(password !== confirm_password)
    {
        return res.render("transport_register", {
            error: "Passwords do not match"
        });
    }

    const password_hash = bcrypt.hashSync(password, 10);

    Transport.createTransport(
        {
            email,
            password: password_hash
        },
        (error) =>
        {
            if(error)
            {
                console.error(error);
                return res.render("transport_register", {
                    error: "Registration failed"
                });
            }

            // After successful registration, go to common login (JWT-based)
            return res.redirect("/login");
        }
    );
}

module.exports = {
    Transpose_home,
    Bus_transpose_home,
    Train_transpose_home,
    metro_transpose_home,
    transport_register,
    transpose_register_page,
    getBusRoutes,
    createBusRoute,
    updateBusRoute,
    deleteBusRoute,
    getTrainRoutes,
    createTrainRoute,
    updateTrainRoute,
    deleteTrainRoute,
    getMetroRoutes,
    createMetroRoute,
    updateMetroRoute,
    deleteMetroRoute
};