const db = require("../config/db");

// create court account
function createCourt(data, callback)
{
    const sql = `
        INSERT INTO court (email, password)
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

// find court by email
function findByEmail(email, callback)
{
    const sql = `
        SELECT * FROM court
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
    createCourt,
    findByEmail
};
