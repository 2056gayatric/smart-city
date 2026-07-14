const db = require("../config/db");

// create hospital account
function createHospital(data, callback)
{
    const sql = `
        INSERT INTO hospital (email, password)
        VALUES (?, ?)
    `;

    db.query(
        sql,
        [
            data.email,
            data.password   // hashed password stored here
        ],
        callback
    );
}

// find hospital by email
function findByEmail(email, callback)
{
    const sql = `
        SELECT * FROM hospital
        WHERE email = ?
        LIMIT 1
    `;

    db.query(sql, [email], (err, result) =>
    {
        if(err)
        {
            return callback(err, null);
        }

        callback(null, result[0]);
    });
}

module.exports = {
    createHospital,
    findByEmail
};
