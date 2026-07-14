const WaterComplaint = require("../models/water_complaints");

const CREATE_WATER_COMPLAINT = async (req, res) =>
{
    try
    {
        const complaint = await WaterComplaint.create(
        {
            complaintId: req.body.complaintId || `WTR-${Date.now().toString().slice(-8)}`,

            locationMethod: req.body.locationMethod,

            gpsAddress:
                req.body.locationMethod === "gps"
                    ? req.body.gpsAddress
                    : null,

            address:
                req.body.locationMethod === "address"
                    ? {
                        houseNo: req.body["address[houseNo]"],
                        street: req.body["address[street]"],
                        ward: req.body["address[ward]"],
                        city: req.body["address[city]"],
                        pincode: req.body["address[pincode]"],
                        landmark: req.body["address[landmark]"]
                    }
                    : null,

            issueType: req.body.issueType,
            description: req.body.description,
            issueDate: req.body.issueDate,
            issueTime: req.body.issueTime,

            media:
                req.files
                    ? req.files.map(file =>
                        ({
                            fileName: file.filename,
                            filePath: file.path,
                            fileType: file.mimetype
                        }))
                    : [],

            duration: req.body.duration,
            fullName: req.body.fullName,
            phone: req.body.phone,
            email: req.body.email,

            status: "Pending"
        });

        res.status(201).json(
        {
            success: true,
            message: "Water complaint registered successfully",
            complaintId: complaint.complaintId
        });
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json(
        {
            success: false,
            message: "Failed to register complaint"
        });
    }
};

module.exports =
{
    CREATE_WATER_COMPLAINT
};
