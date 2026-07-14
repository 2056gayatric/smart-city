async function park(req,res) {
    return res.render("park")
}

async function ground(req,res) {
    return res.render("ground")
}

async function swimming(req,res) {
    return res.render("swimming_pool")
}   

async function housing(req,res) {
    return res.render("housing")
} 

module.exports ={
    park,
    ground,
    swimming,
    housing
}