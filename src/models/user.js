const pool = require("../config/db");

module.exports = {
    getPetugas: async (user) => {
        const [rows] = await pool.query(
            "SELECT * FROM petugas WHERE nip = ?",
            [user]
        );
        return rows[0];
    },

    isDokter: async (kd_dokter) => {
        if (!kd_dokter) return false;

        const [rows] = await pool.query(
            "SELECT * FROM dokter WHERE kd_dokter = ?",
            [kd_dokter]
        );

        return rows.length > 0;
    },

    riwayatregistrasi: async (no_rm) => {
        if (!no_rm) return false;

        const [rows] = await pool.query(
            "SELECT * FROM reg_periksa WHERE no_rm = ? ORDER BY tgl_registrasi DESC",
            [no_rm]
        );

        return rows.length > 0;
    },
    
    dataPasien: async (no_rm) => {
        if (!no_rm) return false;

        const [rows] = await pool.query(
            "SELECT * FROM pasien WHERE no_rm = ?",
            [no_rm]
        );

        return rows.length > 0;
    },



};
