const pool = require("../../config/db");

module.exports = {

    riwayatSoapDokter: async (no_rm) => {
        try {
            if (!no_rm) {
                throw new Error("no_rm is required");
            }

            const query = `
                SELECT *
                FROM (
                    -- =======================
                    -- === RAWAT JALAN =======
                    -- =======================
                    SELECT 
                        ralan.tgl_perawatan,
                        ralan.jam_rawat,
                        ralan.keluhan,
                        ralan.pemeriksaan,
                        ralan.penilaian,
                        ralan.rtl,
                        ralan.instruksi,
                        ralan.evaluasi,
                        pt.nama,
                        'Ralan' AS STATUS,
                        CASE 
                            WHEN penjab.png_jawab = 'BPJS' THEN
                                CASE 
                                    WHEN bridging_sep.peserta LIKE '%PBI%' THEN 'BPJS - PBI'
                                    ELSE 'BPJS - Non PBI'
                                END
                            ELSE penjab.png_jawab
                        END AS jenis_peserta
                    FROM pemeriksaan_ralan ralan
                    INNER JOIN reg_periksa rp ON ralan.no_rawat = rp.no_rawat
                    INNER JOIN penjab ON rp.kd_pj = penjab.kd_pj
                    INNER JOIN petugas pt ON ralan.nip = pt.nip
                    INNER JOIN dokter d ON ralan.nip = d.kd_dokter
                    LEFT JOIN bridging_sep ON bridging_sep.no_rawat = rp.no_rawat
                    WHERE rp.no_rkm_medis = ? 

                    UNION ALL

                    -- =======================
                    -- === RAWAT INAP ========
                    -- =======================
                    SELECT 
                        ranap.tgl_perawatan,
                        ranap.jam_rawat,
                        ranap.keluhan,
                        ranap.pemeriksaan,
                        ranap.penilaian,
                        ranap.rtl,
                        ranap.instruksi,
                        ranap.evaluasi,
                        pt.nama,
                        'Ranap' AS STATUS,
                        CASE 
                            WHEN penjab.png_jawab = 'BPJS' THEN
                                CASE 
                                    WHEN bridging_sep.peserta LIKE '%PBI%' THEN 'BPJS - PBI'
                                    ELSE 'BPJS - Non PBI'
                                END
                            ELSE penjab.png_jawab
                        END AS jenis_peserta
                    FROM pemeriksaan_ranap ranap
                    INNER JOIN reg_periksa rp ON ranap.no_rawat = rp.no_rawat
                    INNER JOIN penjab ON rp.kd_pj = penjab.kd_pj
                    INNER JOIN petugas pt ON ranap.nip = pt.nip
                    INNER JOIN dokter d ON ranap.nip = d.kd_dokter
                    LEFT JOIN bridging_sep ON bridging_sep.no_rawat = rp.no_rawat
                    WHERE rp.no_rkm_medis = ? 
                ) AS gabungan
                ORDER BY tgl_perawatan DESC, jam_rawat DESC
                LIMIT 15;
            `;

            const [rows] = await pool.query(query, [no_rm, no_rm]);

            // Kembalikan semua data
            return rows;

        } catch (error) {
            console.error("Error in getRegisterByNoRawat:", error.message);
            throw error; 
        }
    },

    resume: async (no_rawat) => {
        try {
            if (!no_rawat) {
                throw new Error("no_rawat is required");
            }

            const query = `
                SELECT resume_pasien.*, dokter.nm_dokter, reg_periksa.tgl_registrasi 
                FROM resume_pasien 
                JOIN reg_periksa on reg_periksa.no_rawat = resume_pasien.no_rawat 
                JOIN dokter on dokter.kd_dokter = resume_pasien.kd_dokter 
                WHERE resume_pasien.no_rawat = ? 
            `;

            const [rows] = await pool.query(query, [no_rawat]);

            return rows.length > 0 ? rows[0] : null;

        } catch (error) {
            console.error("Error in getRegisterByNoRawat:", error.message);
            throw error; 
        }
    },

    allRiwayatSoap: async (no_rm) => {
        try {
            if (!no_rm) {
                throw new Error("no_rm is required");
            }

            const query = `
                SELECT *
                FROM (
                    -- =======================
                    -- === RAWAT JALAN =======
                    -- =======================
                    SELECT 
                        ralan.tgl_perawatan,
                        ralan.jam_rawat,
                        ralan.keluhan,
                        ralan.pemeriksaan,
                        ralan.penilaian,
                        ralan.rtl,
                        ralan.instruksi,
                        ralan.evaluasi,
                        pt.nama,
                        'Ralan' AS status,
                        CASE 
                            WHEN penjab.png_jawab = 'BPJS' THEN
                                CASE 
                                    WHEN bridging_sep.peserta LIKE '%PBI%' THEN 'BPJS - PBI'
                                    ELSE 'BPJS - Non PBI'
                                END 
                            ELSE penjab.png_jawab 
                        END AS jenis_peserta
                    FROM pemeriksaan_ralan ralan
                    INNER JOIN reg_periksa rp ON ralan.no_rawat = rp.no_rawat
                    INNER JOIN penjab ON rp.kd_pj = penjab.kd_pj
                    INNER JOIN petugas pt ON ralan.nip = pt.nip
                    INNER JOIN dokter d ON ralan.nip = d.kd_dokter
                    LEFT JOIN bridging_sep ON bridging_sep.no_rawat = rp.no_rawat
                    WHERE rp.no_rkm_medis = ? 

                    UNION ALL

                    -- =======================
                    -- === RAWAT INAP ========
                    -- =======================
                    SELECT 
                        ranap.tgl_perawatan,
                        ranap.jam_rawat,
                        ranap.keluhan,
                        ranap.pemeriksaan,
                        ranap.penilaian,
                        ranap.rtl,
                        ranap.instruksi,
                        ranap.evaluasi,
                        pt.nama,
                        'Ranap' AS status,
                        CASE 
                            WHEN penjab.png_jawab = 'BPJS' THEN
                                CASE 
                                    WHEN bridging_sep.peserta LIKE '%PBI%' THEN 'BPJS - PBI'
                                    ELSE 'BPJS - Non PBI'
                                END
                            ELSE penjab.png_jawab
                        END AS jenis_peserta
                    FROM pemeriksaan_ranap ranap
                    INNER JOIN reg_periksa rp ON ranap.no_rawat = rp.no_rawat
                    INNER JOIN penjab ON rp.kd_pj = penjab.kd_pj
                    INNER JOIN petugas pt ON ranap.nip = pt.nip
                    LEFT JOIN bridging_sep ON bridging_sep.no_rawat = rp.no_rawat
                    WHERE rp.no_rkm_medis = ? 
                ) AS gabungan
                ORDER BY tgl_perawatan DESC, jam_rawat DESC
                LIMIT 15;
            `;

            const [rows] = await pool.query(query, [no_rm, no_rm]);

            // Kembalikan semua data
            return rows;

        } catch (error) {
            console.error("Error in getRegisterByNoRawat:", error.message);
            throw error; 
        }
    },

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
