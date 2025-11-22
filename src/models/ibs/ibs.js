const pool = require("../../config/db");

module.exports = {

    asuhanMedisPascaBedah: async (no_rawat) => {
        try {
            if (!no_rawat) {
                throw new Error("no_rawat is required");
            }

            const query = `
                SELECT asuhan_medis_pasca_bedah.*, petugas.nama 
                FROM asuhan_medis_pasca_bedah 
                JOIN petugas on petugas.nip = asuhan_medis_pasca_bedah.kd_dokter
                WHERE asuhan_medis_pasca_bedah.no_rawat = ?
            `;

            const [rows] = await pool.query(query, [no_rawat]);

            return rows.length > 0 ? rows[0] : null;

        } catch (error) {
            console.error("Error in getRegisterByNoRawat:", error.message);
            throw error; // diteruskan ke controller
        }
    },
    asuhanMedisPraBedah: async (no_rawat) => {
        try {
            if (!no_rawat) {
                throw new Error("no_rawat is required");
            }

            const query = `
                SELECT asuhan_medis_pra_bedah.*, petugas.nama 
                FROM asuhan_medis_pra_bedah 
                JOIN petugas on petugas.nip = asuhan_medis_pra_bedah.kd_dokter
                WHERE asuhan_medis_pra_bedah.no_rawat = ?
            `;

            const [rows] = await pool.query(query, [no_rawat]);

            return rows.length > 0 ? rows[0] : null;

        } catch (error) {
            console.error("Error in getRegisterByNoRawat:", error.message);
            throw error; // diteruskan ke controller
        }
    },


};
