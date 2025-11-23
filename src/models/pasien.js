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

    diagnosa: async (no_rawat) => {

        try {
            if (!no_rawat) {
                throw new Error("no_rawat is required");
            }

            const query = `
                SELECT diagnosa_pasien.no_rawat, diagnosa_pasien.kd_penyakit, diagnosa_pasien.prioritas, diagnosa_pasien.status AS status_perawatan, penyakit.nm_penyakit, penyakit.status  
                FROM diagnosa_pasien 
                JOIN penyakit on penyakit.kd_penyakit = diagnosa_pasien.kd_penyakit 
                WHERE diagnosa_pasien.no_rawat = ? ORDER BY diagnosa_pasien.prioritas ASC 
            `;

            const [rows] = await pool.query(query, [no_rawat]);

            // Kembalikan semua data
            return rows;

        } catch (error) {
            console.error("Error in getRegisterByNoRawat:", error.message);
            throw error; // diteruskan ke controller
        }
    },

};
