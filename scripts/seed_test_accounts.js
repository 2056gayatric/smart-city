const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false }
});

const TEST_EMAIL = "admin@gmail.com";
const TEST_PASS = "Test@123";
const HASHED_PASS = bcrypt.hashSync(TEST_PASS, 10);

const tables = ["citizen", "government", "court", "hospital", "transport"];

async function seed() {
    db.connect();
    
    for (const table of tables) {
        console.log(`Ensuring test account exists in table: ${table}`);
        
        // Use an UPSERT-like logic (Delete and insert to be sure of state)
        const deleteSql = `DELETE FROM ${table === 'transport' ? 'transport' : table} WHERE email = ?`;
        const insertSql = `INSERT INTO ${table === 'transport' ? 'transport' : table} (email, password) VALUES (?, ?)`;
        
        db.query(deleteSql, [TEST_EMAIL], (err) => {
            if (err) console.error(`Failed to delete from ${table}:`, err.message);
            
            db.query(insertSql, [TEST_EMAIL, HASHED_PASS], (err2) => {
                if (err2) console.error(`Failed to insert into ${table}:`, err2.message);
                else console.log(`Successfully seeded ${table}`);
            });
        });
    }

    // Wait a bit and close
    setTimeout(() => {
        db.end();
        console.log("Seeding finished.");
        process.exit(0);
    }, 5000);
}

seed().catch(err => {
    console.error("Seeding failed:", err);
    process.exit(1);
});
