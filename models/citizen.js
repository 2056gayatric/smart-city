const db = require("../config/db");

//create citizen table
function createCitizen(data, callback)
{
    const sql = `
        INSERT INTO citizen
        (full_name, username, email, phone_number, password, gender, city)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.full_name,
            data.username,
            data.email,
            data.phone_number,
            data.password,
            data.gender,
            data.city
        ],
        callback
    );
};

//finding by email and password
function findByEmailOrUsername(value, callback)
{
    const sql = `
        SELECT * FROM citizen
        WHERE email = ? OR username = ?
        LIMIT 1
    `;

    db.query(sql, [value, value], (err, result) =>
    {
        if (err)
        {
            return callback(err, null);
        }

        callback(null, result[0]);
    });
}

module.exports = {
    createCitizen,
    findByEmailOrUsername
};

