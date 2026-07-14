const RoadComplaint = require("../models/roads_complaints");

const CREATE_ROAD_COMPLAINT = async (req, res) =>
{
    try
    {
        console.log("Road Complaint Body:", req.body);
        console.log("Files:", req.files);

        const complaint = new RoadComplaint(
        {
            complaintId: req.body.complaintId,

            address:
            {
                roadName: req.body.roadName,
                area: req.body.area,
                ward: req.body.ward,
                city: req.body.city,
                pincode: req.body.pincode,
                landmark: req.body.landmark || null
            },

            issue:
            {
                issueType: req.body.issueType,
                securityLevel: req.body.securityLevel,
                affectedArea: req.body.affectedArea,
                duration:
                {
                    value: req.body.durationValue,
                    unit: req.body.durationUnit
                },
                monsoonIssue: req.body.monsoonIssue || null,
                remarks: req.body.remarks || null
            },

            capture:
            {
                date: req.body.captureDate,
                time: req.body.captureTime
            },

            media: req.files?.map(file => file.path) || []
        });

        await complaint.save();

        res.status(201).json(
        {
            success: true,
            message: "Road complaint registered successfully",
            complaintId: complaint.complaintId
        });
    }
    catch(error)
    {
        console.error("Road Complaint Error:", error);

        res.status(500).json(
        {
            success: false,
            message: "Road complaint creation failed",
            error: error.message
        });
    }
};

module.exports =
{
    CREATE_ROAD_COMPLAINT
};
