const pool = require("../config/db");

module.exports = {
    getAllRegisterbyDate: async (username) => {
        const [rows] = await pool.query(
            "SELECT * FROM reg_periksa WHERE tgl_registrasi = ?",
            [username]
        );
        return rows[0];
    },
    
    getStatusregistrasi: async (no_rawat) => {
        const [rows] = await pool.query(
            "SELECT status_lanjut FROM reg_periksa WHERE no_rawat = ?",
            [no_rawat]
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
    
    getJenisBayar: async (no_rawat) => {
        const [rows] = await pool.query(
            `SELECT 
                reg_periksa.no_rawat,
                pasien.nm_pasien,
                penjab.png_jawab,
                CASE 
                    WHEN penjab.png_jawab = 'BPJS' THEN 
                        CASE 
                            WHEN bridging_sep.peserta LIKE '%PBI%' 
                                OR bridging_sep.peserta LIKE '%PBPU%' 
                            THEN 'BPJS - PBI'
                            ELSE 'BPJS - Non PBI'
                        END
                    ELSE penjab.png_jawab
                END AS jenis_peserta
            FROM reg_periksa
            INNER JOIN pasien 
                ON reg_periksa.no_rkm_medis = pasien.no_rkm_medis
            INNER JOIN penjab 
                ON reg_periksa.kd_pj = penjab.kd_pj
            LEFT JOIN bridging_sep 
                ON bridging_sep.no_rawat = reg_periksa.no_rawat
            WHERE reg_periksa.no_rawat = ?;
            `,
            [no_rawat]
        );
        return rows[0];
    },

    getPasien: async (no_rm) => {
        const [rows] = await pool.query(
            `SELECT pasien.*, 
                CONCAT_WS(', ', pasien.alamat, kelurahan.nm_kel, kecamatan.nm_kec, kabupaten.nm_kab, propinsi.nm_prop) AS alamat_pasien 
                FROM pasien 
                JOIN kelurahan on kelurahan.kd_kel = pasien.kd_kel 
                JOIN kecamatan on kecamatan.kd_kec = pasien.kd_kec 
                JOIN kabupaten on kabupaten.kd_kab = pasien.kd_kab 
                JOIN propinsi on propinsi.kd_prop = pasien.kd_prop 
                WHERE pasien.no_rkm_medis = ?`,
            [no_rm]
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
