const ElectricityComplaint = require("../models/electricity_complaints");

const CREATE_ELECTRICITY_COMPLAINT = async (req, res) =>
{
    try
    {
        console.log("Electricity Complaint Body:", req.body);
        console.log("Files:", req.files);

        const complaint = new ElectricityComplaint(
        {
            complaintId: req.body.complaintId,
            locationMethod: req.body.locationMethod,

            consumer: req.body.consumer,

            connection: req.body.connection,

            address: req.body.address,

            issue: req.body.issue,

            media: req.files?.map(file => file.path) || []
        });

        await complaint.save();

        res.status(201).json(
        {
            success: true,
            message: "Electricity complaint registered successfully",
            complaintId: complaint.complaintId
        });
    }
    catch(error)
    {
        console.error("Electricity Complaint Error:", error);

        res.status(500).json(
        {
            success: false,
            message: "Electricity complaint validation failed",
            error: error.message
        });
    }
};

module.exports =
{
    CREATE_ELECTRICITY_COMPLAINT
};
