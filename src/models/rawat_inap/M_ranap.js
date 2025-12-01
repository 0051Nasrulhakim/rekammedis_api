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

            // Kembalikan semua data
            return rows;

        } catch (error) {
            console.error("Error in getRegisterByNoRawat:", error.message);
            throw error; // diteruskan ke controller
        }
    },

    transferPasien: async (no_rawat) => {
        try {
            if (!no_rawat) {
                throw new Error("no_rawat is required");
            }

            const query = `
                SELECT transfer_pasien_antar_ruang.*, petugas_serah.nama as penyerah, petugas_terima.nama as penerima   
                FROM transfer_pasien_antar_ruang 
                JOIN petugas AS petugas_serah on petugas_serah.nip = transfer_pasien_antar_ruang.nip_menyerahkan  
                JOIN petugas AS petugas_terima on petugas_terima.nip = transfer_pasien_antar_ruang.nip_menerima  
                WHERE transfer_pasien_antar_ruang.no_rawat = ? 
            `;

            const [rows] = await pool.query(query, [no_rawat]);

            // Kembalikan semua data
            return rows;

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
                SELECT 
                    detail_beri_diet.no_rawat,
                    reg_periksa.no_rkm_medis,
                    pasien.nm_pasien,
                    CONCAT(detail_beri_diet.kd_kamar, ', ', bangsal.nm_bangsal) AS kamar_bangsal,
                    detail_beri_diet.tanggal,
                    detail_beri_diet.waktu,
                    jam_diet_pasien.jam,
                    diet.nama_diet,
                    detail_beri_diet.kd_kamar,
                    detail_beri_diet.kd_diet
                FROM detail_beri_diet
                INNER JOIN reg_periksa 
                    ON detail_beri_diet.no_rawat = reg_periksa.no_rawat
                INNER JOIN pasien 
                    ON reg_periksa.no_rkm_medis = pasien.no_rkm_medis
                INNER JOIN diet 
                    ON detail_beri_diet.kd_diet = diet.kd_diet
                INNER JOIN kamar 
                    ON detail_beri_diet.kd_kamar = kamar.kd_kamar
                INNER JOIN bangsal 
                    ON kamar.kd_bangsal = bangsal.kd_bangsal
                INNER JOIN jam_diet_pasien 
                    ON detail_beri_diet.waktu = jam_diet_pasien.waktu
                WHERE  detail_beri_diet.no_rawat = ? 
                ORDER BY 
                    bangsal.nm_bangsal,
                    diet.nama_diet; 
            `;

            const [rows] = await pool.query(query, [no_rawat]);

            // Kembalikan semua data
            return rows;

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
                JOIN petugas AS pt_dokter ON pt_dokter.nip = pakr.kd_dokter
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
