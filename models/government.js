const db = require("../config/db");

// create government account
function createGovernment(data, callback) {
    const sql = `
        INSERT INTO government (email, password)
        VALUES (?, ?)
    `;

    db.query(
        sql,
        [
            data.email,
            data.password
        ],
        callback
    );
}

// find government by email
function findByEmail(email, callback) {
    const sql = `
        SELECT * FROM government
        WHERE email = ?
        LIMIT 1
    `;

    db.query(sql, [email], (err, result) => {
        if (err) {
            return callback(err, null);
        }

        callback(null, result[0]);
    });
}

module.exports = {
    createGovernment,
    findByEmail
};