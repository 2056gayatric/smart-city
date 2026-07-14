const jwt = require("jsonwebtoken");

// General JWT check
function AUTH_MIDDLEWARE(req, res, next)
{
    const token = req.cookies.token;

    if(!token) return res.redirect("/login");

    try
    {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(error)
    {
        res.clearCookie("token");
        return res.redirect("/login");
    }
}

// Citizen only
function CITIZEN_ONLY(req, res, next)
{
    if(req.user.role !== "citizen") return res.status(403).send("Access denied");
    next();
}

// Government only
function GOVERNMENT_ONLY(req, res, next)
{
    if(req.user.role !== "admin" || req.user.department !== "government")
        return res.redirect("/login");
    next();
}

// Court only
function COURT_ONLY(req, res, next)
{
    if(req.user.role !== "admin" || req.user.department !== "court")
        return res.redirect("/login");
    next();
}

// Hospital only
function HOSPITAL_ONLY(req, res, next)
{
    if(req.user.role !== "admin" || req.user.department !== "hospital")
        return res.redirect("/login");
    next();
}

// Transport only
function TRANSPORT_ONLY(req, res, next)
{
    if(req.user.role !== "admin" || req.user.department !== "transport")
        return res.redirect("/login");
    next();
}

module.exports = {
    AUTH_MIDDLEWARE,
    CITIZEN_ONLY,
    GOVERNMENT_ONLY,
    COURT_ONLY,
    HOSPITAL_ONLY,
    TRANSPORT_ONLY
};
