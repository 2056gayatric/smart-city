const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
   // host: process.env.DB_HOST,
   host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
});

db.connect((error) =>
{
    if(error)
    {
        console.error("❌ MySQL connection failed:", error.message);
        console.warn("⚠️ Continuing without MySQL. Admin and Citizen data may be unavailable.");
    }
    else
    {
        console.log("🚀 MySQL connected to Aiven Cloud");
    }
});

module.exports = db;
