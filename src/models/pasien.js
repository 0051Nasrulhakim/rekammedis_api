const pool = require("../config/db");

module.exports = {
    getAllRegisterbyDate: async (username) => {
        const [rows] = await pool.query(
            "SELECT * FROM reg_periksa WHERE tgl_registrasi = ?",
            [username]
        );
        return rows[0];
    },
    getNorm: async (no_rawat) => {
        const [rows] = await pool.query(
            "SELECT no_rkm_medis FROM reg_periksa WHERE no_rawat = ?",
            [no_rawat]
        );
        return rows[0];
    },

};
