const EmergencyAlert = require("../models/police_emergency");

const CREATE_EMERGENCY_ALERT_police = async (req, res) =>
{
    try
    {
        const { address, city, landmark } = req.body;

        if(!address || !city)
        {
            return res.status(400).json(
            {
                success: false,
                message: "Address and City are required"
            });
        }

        const alertId = "ALERT-" + Date.now();

        const emergencyAlert = new EmergencyAlert(
        {
            address,
            city,
            landmark,
            alertId
        });

        await emergencyAlert.save();

        res.render("succesful_alert")
    }
    catch(error)
    {
        res.status(500).json(
        {
            success: false,
            message: "Failed to send emergency alert",
            error: error.message
        });
    }
};

module.exports =
{
    CREATE_EMERGENCY_ALERT_police
};
