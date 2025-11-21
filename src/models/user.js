const pool = require("../config/db");

module.exports = {
    getDokter: async (user) => {
        const [rows] = await pool.query(
            "SELECT * FROM petugas WHERE nip = ?",
            [user]
        );
        return rows[0];
    },

};
