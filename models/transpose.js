const db = require("../config/db");

// create transport account
function createTransport(data, callback)
{
    const sql = `
        INSERT INTO transport (email, password)
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

// find transport by email
function findByEmail(email, callback)
{
    const sql = `
        SELECT * FROM transport
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
    createTransport,
    findByEmail
};
