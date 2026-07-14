const AmbulanceRequest = require("../models/ambulance_emergency");

const CREATE_AMBULANCE_REQUEST = async (req, res) =>
{
    try
    {
        console.log("BODY:", req.body);

        const { address } = req.body;

        if(!address)
        {
            return res.status(400).json(
            {
                success: false,
                message: "Address is required"
            });
        }

        const request = new AmbulanceRequest(
        {
            address
        });

        await request.save();

        res.render("succesful_alert")
    }
    catch(error)
    {
        res.status(500).json(
        {
            success: false,
            message: "Failed to store ambulance request",
            error: error.message
        });
    }
};

module.exports =
{
    CREATE_AMBULANCE_REQUEST
};
