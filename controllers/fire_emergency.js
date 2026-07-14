const FireEmergency = require("../models/fire_emergency");

const CREATE_FIRE_EMERGENCY_REQUEST = async (req, res) =>
{
    try
    {
        console.log("BODY:", req.body);

        const { address } = req.body;

        if(!address || address.trim() === "")
        {
            return res.status(400).json(
            {
                success: false,
                message: "Address is required"
            });
        }

        const fireRequest = new FireEmergency(
        {
            address
        });

        await fireRequest.save();

        res.render("succesful_alert")
    }
    catch(error)
    {
        res.status(500).json(
        {
            success: false,
            message: "Failed to store fire emergency request",
            error: error.message
        });
    }
};

module.exports =
{
    CREATE_FIRE_EMERGENCY_REQUEST
};
