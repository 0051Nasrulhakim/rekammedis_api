const pool = require("../../config/db");

module.exports = {

    awalMedisRalan: async (no_rawat) => {
        try {
            if (!no_rawat) {
                throw new Error("no_rawat is required");
            }

            const query = `
                SELECT penilaian_medis_ralan.*, dokter.nm_dokter 
                FROM penilaian_medis_ralan 
                JOIN dokter on dokter.kd_dokter = penilaian_medis_ralan.kd_dokter
                WHERE penilaian_medis_ralan.no_rawat = ?
            `;

            const [rows] = await pool.query(query, [no_rawat]);

            return rows.length > 0 ? rows[0] : null;

        } catch (error) {
            console.error("Error in getRegisterByNoRawat:", error.message);
            throw error; // diteruskan ke controller
        }
    },
    awalMedisIgd: async (no_rawat) => {
        try {
            if (!no_rawat) {
                throw new Error("no_rawat is required");
            }

            const query = `
                SELECT penilaian_medis_igd.*, dokter.nm_dokter 
                FROM penilaian_medis_igd 
                JOIN dokter on dokter.kd_dokter = penilaian_medis_igd.kd_dokter
                WHERE penilaian_medis_igd.no_rawat = ?
            `;

            const [rows] = await pool.query(query, [no_rawat]);

            return rows.length > 0 ? rows[0] : null;

        } catch (error) {
            console.error("Error in getRegisterByNoRawat:", error.message);
            throw error; // diteruskan ke controller
        }
    },
    awalKeperawatanRalan: async (no_rawat) => {
        try {
            if (!no_rawat) {
                throw new Error("no_rawat is required");
            }

            const query = `
                SELECT penilaian_awal_keperawatan_ralan.*, petugas.nama 
                FROM penilaian_awal_keperawatan_ralan 
                JOIN petugas on petugas.nip = penilaian_awal_keperawatan_ralan.nip
                WHERE penilaian_awal_keperawatan_ralan.no_rawat = ?
            `;

            const [rows] = await pool.query(query, [no_rawat]);

            return rows.length > 0 ? rows[0] : null;

        } catch (error) {
            console.error("Error in getRegisterByNoRawat:", error.message);
            throw error; // diteruskan ke controller
        }
    },
    awalKeperawatanIgd: async (no_rawat) => {
        try {
            if (!no_rawat) {
                throw new Error("no_rawat is required");
            }

            const query = `
                SELECT penilaian_awal_keperawatan_igd.*, petugas.nama 
                FROM penilaian_awal_keperawatan_igd 
                JOIN petugas on petugas.nip = penilaian_awal_keperawatan_igd.nip
                WHERE penilaian_awal_keperawatan_igd.no_rawat = ?
            `;

            const [rows] = await pool.query(query, [no_rawat]);

            return rows.length > 0 ? rows[0] : null;

        } catch (error) {
            console.error("Error in getRegisterByNoRawat:", error.message);
            throw error; // diteruskan ke controller
        }
    },


};
