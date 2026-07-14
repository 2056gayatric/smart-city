const GarbageComplaint = require("../models/garbage_complaints");

const CREATE_GARBAGE_COMPLAINT = async (req, res) =>
{
    try
    {
        console.log("Garbage Complaint Body:", req.body);
        console.log("Files:", req.files);

        const complaint = new GarbageComplaint(
        {
            complaintId: req.body.complaintId,
            locationMethod: req.body.locationMethod,

            address:
            {
                street: req.body.street,
                city: req.body.city,
                zipCode: req.body.zipCode,
                ward: req.body.ward,
                details: req.body.details
            },

            garbageType: req.body.garbageType,
            description: req.body.description,
            photoDate: req.body.photoDate,
            photoTime: req.body.photoTime,
            duration: req.body.duration,
            quantity: req.body.quantity,
            issueType: req.body.issueType,

            fullName: req.body.fullName,
            phone: req.body.phone,
            email: req.body.email,

            media: req.files?.map(file => file.path)
        });

        await complaint.save();

        res.status(201).json(
        {
            success: true,
            message: "Garbage complaint submitted successfully"
        });
    }
    catch(error)
    {
        console.error("Garbage Complaint Error:", error);
        res.status(500).json(
        {
            success: false,
            error: error.message
        });
    }
};

module.exports =
{
    CREATE_GARBAGE_COMPLAINT
};
