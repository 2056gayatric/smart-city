const bcrypt = require("bcryptjs");
const Government = require("../models/government");
const { ObjectId } = require("mongodb");

// =====================
// GOVERNMENT AUTH
// =====================
async function government_home(req, res)
{
    try
    {
        const mongoose = require("mongoose");
        const db = mongoose.connection.db;

        if(!db)
        {
            throw new Error("Database not connected");
        }

        const collectionNames = [
            "watercomplaints",
            "garbagecomplaints",
            "electricitycomplaints",
            "roadcomplaints"
        ];

        let totalComplaints = 0;
        let resolvedComplaints = 0;
        let inProgressComplaints = 0;

        const categoryStats = {};

        for(const name of collectionNames)
        {
            const collection = db.collection(name);

            const [totalCount, resolvedCount, inProgressCount] = await Promise.all([
                collection.countDocuments({}),
                collection.countDocuments({ status: "resolved" }),
                collection.countDocuments({ status: "in_progress" })
            ]);

            totalComplaints += totalCount;
            resolvedComplaints += resolvedCount;
            inProgressComplaints += inProgressCount;

            categoryStats[name] =
            {
                total: totalCount,
                active: totalCount - resolvedCount
            };
        }

        return res.render("government",
        {
            stats:
            {
                totalComplaints,
                resolvedComplaints,
                inProgressComplaints,
                categories:
                {
                    water: categoryStats["watercomplaints"] || { total: 0, active: 0 },
                    garbage: categoryStats["garbagecomplaints"] || { total: 0, active: 0 },
                    electricity: categoryStats["electricitycomplaints"] || { total: 0, active: 0 },
                    roads: categoryStats["roadcomplaints"] || { total: 0, active: 0 }
                }
            }
        });
    }
    catch(error)
    {
        console.error(error);

        return res.render("government",
        {
            stats:
            {
                totalComplaints: 0,
                resolvedComplaints: 0,
                inProgressComplaints: 0,
                categories:
                {
                    water: { total: 0, active: 0 },
                    garbage: { total: 0, active: 0 },
                    electricity: { total: 0, active: 0 },
                    roads: { total: 0, active: 0 }
                }
            },
            error: error.message
        });
    }
}

async function government_register_page(req, res)
{
    return res.render("government_register");
}

async function government_register(req, res)
{
    const { email, password, confirm_password } = req.body;

    if(password !== confirm_password)
    {
        return res.render("government_register", {
            error: "Passwords do not match"
        });
    }

    const password_hash = bcrypt.hashSync(password, 10);

    Government.createGovernment(
        {
            email,
            password: password_hash
        },
        (error) =>
        {
            if(error)
            {
                console.error(error);
                return res.render("government_register", {
                    error: "Registration failed"
                });
            }

            // After successful registration, go to common login (JWT-based)
            return res.redirect("/login");
        }
    );
}

// =====================
// WATER COMPLAINTS
// =====================
async function water_complaints_view(req, res)
{
    try
    {
        const mongoose = require("mongoose");
        const db = mongoose.connection.db;

        if(!db)
        {
            throw new Error("Database not connected");
        }

        const complaints = await db
            .collection("watercomplaints")
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        if(req.headers.accept && req.headers.accept.includes("application/json"))
        {
            return res.json({ success: true, complaints });
        }

        return res.render("water_government", { complaints });
    }
    catch(error)
    {
        console.error(error);

        return res.render("water_government", {
            complaints: [],
            error: error.message
        });
    }
}

async function getComplaintById(req, res)
{
    try
    {
        const { id } = req.params;
        const mongoose = require("mongoose");
        const db = mongoose.connection.db;

        const complaint = await db
            .collection("watercomplaints")
            .findOne({ _id: new ObjectId(id) });

        if(!complaint)
        {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

        return res.json({ success: true, complaint });
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function updateComplaint(req, res)
{
    try
    {
        const { id } = req.params;
        const updateData = req.body;

        const mongoose = require("mongoose");
        const db = mongoose.connection.db;

        updateData.updatedAt = new Date();

        const result = await db
            .collection("watercomplaints")
            .findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: updateData },
                { returnDocument: "after" }
            );

        if(!result.value)
        {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

        return res.json({
            success: true,
            message: "Updated successfully",
            complaint: result.value
        });
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// =====================
// 🆕 GARBAGE COMPLAINTS
// =====================
async function garbage_complaints_view(req, res)
{
    try
    {
        const mongoose = require("mongoose");
        const db = mongoose.connection.db;

        if(!db)
        {
            throw new Error("Database not connected");
        }

        const complaints = await db
            .collection("garbagecomplaints")
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        if(req.headers.accept && req.headers.accept.includes("application/json"))
        {
            return res.json({ success: true, complaints });
        }

        return res.render("garbage_government", { complaints });
    }
    catch(error)
    {
        console.error(error);

        return res.render("garbage_government", {
            complaints: [],
            error: error.message
        });
    }
}

async function getGarbageComplaintById(req, res)
{
    try
    {
        const { id } = req.params;
        const mongoose = require("mongoose");
        const db = mongoose.connection.db;

        const complaint = await db
            .collection("garbagecomplaints")
            .findOne({ _id: new ObjectId(id) });

        if(!complaint)
        {
            return res.status(404).json({
                success: false,
                message: "Garbage complaint not found"
            });
        }

        return res.json({ success: true, complaint });
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function updateGarbageComplaint(req, res)
{
    try
    {
        const { id } = req.params;
        const updateData = req.body;

        const mongoose = require("mongoose");
        const db = mongoose.connection.db;

        updateData.updatedAt = new Date();

        const result = await db
            .collection("garbagecomplaints")
            .findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: updateData },
                { returnDocument: "after" }
            );

        if(!result.value)
        {
            return res.status(404).json({
                success: false,
                message: "Garbage complaint not found"
            });
        }

        return res.json({
            success: true,
            message: "Updated successfully",
            complaint: result.value
        });
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// =====================
// ⚡ ELECTRICITY COMPLAINTS
// =====================
async function electricity_complaints_view(req, res)
{
    try
    {
        const mongoose = require("mongoose");
        const db = mongoose.connection.db;

        if(!db)
        {
            throw new Error("Database not connected");
        }

        const complaints = await db
            .collection("electricitycomplaints")
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        if(req.headers.accept && req.headers.accept.includes("application/json"))
        {
            return res.json({ success: true, complaints });
        }

        return res.render("electricity_government", { complaints });
    }
    catch(error)
    {
        console.error(error);

        return res.render("electricity_government", {
            complaints: [],
            error: error.message
        });
    }
}

async function getElectricityComplaintById(req, res)
{
    try
    {
        const { id } = req.params;
        const mongoose = require("mongoose");
        const db = mongoose.connection.db;

        const complaint = await db
            .collection("electricitycomplaints")
            .findOne({ _id: new ObjectId(id) });

        if(!complaint)
        {
            return res.status(404).json({
                success: false,
                message: "Electricity complaint not found"
            });
        }

        return res.json({ success: true, complaint });
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function updateElectricityComplaint(req, res)
{
    try
    {
        const { id } = req.params;
        const updateData = req.body;

        const mongoose = require("mongoose");
        const db = mongoose.connection.db;

        updateData.updatedAt = new Date();

        const result = await db
            .collection("electricitycomplaints")
            .findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: updateData },
                { returnDocument: "after" }
            );

        if(!result.value)
        {
            return res.status(404).json({
                success: false,
                message: "Electricity complaint not found"
            });
        }

        return res.json({
            success: true,
            message: "Updated successfully",
            complaint: result.value
        });
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// =====================
// 🛣️ ROADS COMPLAINTS
// =====================
async function roads_complaints_view(req, res)
{
    try
    {
        const mongoose = require("mongoose");
        const db = mongoose.connection.db;

        if(!db)
        {
            throw new Error("Database not connected");
        }

        const complaints = await db
            .collection("roadcomplaints")
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        if(req.headers.accept && req.headers.accept.includes("application/json"))
        {
            return res.json({ success: true, complaints });
        }

        return res.render("road_government", { complaints });
    }
    catch(error)
    {
        console.error(error);

        return res.render("road_government", {
            complaints: [],
            error: error.message
        });
    }
}

async function getRoadsComplaintById(req, res)
{
    try
    {
        const { id } = req.params;
        const mongoose = require("mongoose");
        const db = mongoose.connection.db;

        const complaint = await db
            .collection("roadcomplaints")
            .findOne({ _id: new ObjectId(id) });

        if(!complaint)
        {
            return res.status(404).json({
                success: false,
                message: "Road complaint not found"
            });
        }

        return res.json({ success: true, complaint });
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function updateRoadsComplaint(req, res)
{
    try
    {
        const { id } = req.params;
        const updateData = req.body;

        const mongoose = require("mongoose");
        const db = mongoose.connection.db;

        updateData.updatedAt = new Date();

        const result = await db
            .collection("roadcomplaints")
            .findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: updateData },
                { returnDocument: "after" }
            );

        if(!result.value)
        {
            return res.status(404).json({
                success: false,
                message: "Road complaint not found"
            });
        }

        return res.json({
            success: true,
            message: "Updated successfully",
            complaint: result.value
        });
    }
    catch(error)
    {
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
    government_home,
    government_register_page,
    government_register,

    water_complaints_view,
    getComplaintById,
    updateComplaint,

    garbage_complaints_view,
    getGarbageComplaintById,
    updateGarbageComplaint,

    electricity_complaints_view,
    getElectricityComplaintById,
    updateElectricityComplaint,

    roads_complaints_view,
    getRoadsComplaintById,
    updateRoadsComplaint
};
