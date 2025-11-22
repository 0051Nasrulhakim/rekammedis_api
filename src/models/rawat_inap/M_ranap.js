const pool = require("../../config/db");

module.exports = {

    catatanAdimeGizi: async (no_rawat) => {
        try {
            if (!no_rawat) {
                throw new Error("no_rawat is required");
            }

            const query = `
                SELECT catatan_adime_gizi.*, petugas.nama 
                FROM catatan_adime_gizi 
                JOIN petugas on petugas.nip = catatan_adime_gizi.nip 
                WHERE catatan_adime_gizi.no_rawat = ? 
            `;

            const [rows] = await pool.query(query, [no_rawat]);

            return rows.length > 0 ? rows[0] : null;

        } catch (error) {
            console.error("Error in getRegisterByNoRawat:", error.message);
            throw error; // diteruskan ke controller
        }
    },
    
    permintaanDiet: async (no_rawat) => {
        try {
            if (!no_rawat) {
                throw new Error("no_rawat is required");
            }

            const query = `
                SELECT detail_beri_diet.* 
                FROM detail_beri_diet 
                JOIN diet on diet.kd_diet = detail_beri_diet.kd_diet 
                WHERE detail_beri_diet.no_rawat = ? 
            `;

            const [rows] = await pool.query(query, [no_rawat]);

            return rows.length > 0 ? rows[0] : null;

        } catch (error) {
            console.error("Error in getRegisterByNoRawat:", error.message);
            throw error; // diteruskan ke controller
        }
    },

    awalMedisRanap: async (no_rawat) => {
        try {
            if (!no_rawat) {
                throw new Error("no_rawat is required");
            }

            const query = `
                SELECT penilaian_medis_ranap.*, petugas.nama 
                FROM penilaian_medis_ranap 
                JOIN petugas on petugas.nip = penilaian_medis_ranap.kd_dokter 
                WHERE penilaian_medis_ranap.no_rawat = ? 
            `;

            const [rows] = await pool.query(query, [no_rawat]);

            return rows.length > 0 ? rows[0] : null;

        } catch (error) {
            console.error("Error in getRegisterByNoRawat:", error.message);
            throw error; // diteruskan ke controller
        }
    },
    awalKepRanap: async (no_rawat) => {
        try {
            if (!no_rawat) {
                throw new Error("no_rawat is required");
            }

            const query = `
                SELECT 
                    pakr.*,
                    pt_dokter.nama AS nama_dokter,
                    pakr.nip1 AS pengkaji1,
                    pt_perawat1.nama AS nama_pengkaji1,
                    pakr.nip2 AS pengkaji2,
                    pt_perawat2.nama AS nama_pengkaji2
                FROM penilaian_awal_keperawatan_ranap pakr
                JOIN petugas AS pt_dokter   ON pt_dokter.nip = pakr.kd_dokter
                JOIN petugas AS pt_perawat1 ON pt_perawat1.nip = pakr.nip1
                JOIN petugas AS pt_perawat2 ON pt_perawat2.nip = pakr.nip2
                WHERE pakr.no_rawat = ?
            `;


            const [rows] = await pool.query(query, [no_rawat]);

            return rows.length > 0 ? rows[0] : null;

        } catch (error) {
            console.error("Error in getRegisterByNoRawat:", error.message);
            throw error; // diteruskan ke controller
        }
    }


};
