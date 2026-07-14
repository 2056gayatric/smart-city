const express = require("express");
const router = express.Router();
const { login_user } = require("../controllers/login");

// LOGIN PAGE
router.get("/", (req, res) =>
{
    res.render("login_page");
});

// LOGIN SUBMIT
router.post("/", login_user);

// LOGOUT
router.get("/logout", (req, res) =>
{
    res.clearCookie("token");
    res.redirect("/login");
});

module.exports = router;
