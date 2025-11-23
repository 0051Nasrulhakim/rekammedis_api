const ranap = require("../../models/rawat_inap/M_ranap");

module.exports = {

    getCatatanAdimeGizi: async (req, res) => {
        try {
            const { no_rawat } = req.body || {};

            // Validasi input
            if (!no_rawat || no_rawat.trim() === "") {
                return res.status(400).json({
                    success: false,
                    message: "Field no_rawat wajib diisi"
                });
            }

            const data = await ranap.catatanAdimeGizi(no_rawat)

            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: "Data tidak ditemukan"
                });
            }

            return res.json({
                success: true,
                message: "Data ADIME GIZI berhasil diambil",
                data
            });

        } catch (error) {
            console.error("Controller Error:", error.message);

            return res.status(500).json({
                success: false,
                message: "Terjadi kesalahan pada server",
                error: error.message
            });
        }
    },
    getTranferPasienAntarRuang: async (req, res) => {
        try {
            const { no_rawat } = req.body || {};

            // Validasi input
            if (!no_rawat || no_rawat.trim() === "") {
                return res.status(400).json({
                    success: false,
                    message: "Field no_rawat wajib diisi"
                });
            }

            const data = await ranap.transferPasien(no_rawat)

            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: "Data tidak ditemukan"
                });
            }

            return res.json({
                success: true,
                message: "Data History Transfer Anter Ruang berhasil diambil",
                data
            });

        } catch (error) {
            console.error("Controller Error:", error.message);

            return res.status(500).json({
                success: false,
                message: "Terjadi kesalahan pada server",
                error: error.message
            });
        }
    },

    getPermintaanDiet: async (req, res) => {
        try {
            const { no_rawat } = req.body || {};

            // Validasi input
            if (!no_rawat || no_rawat.trim() === "") {
                return res.status(400).json({
                    success: false,
                    message: "Field no_rawat wajib diisi"
                });
            }

            const data = await ranap.permintaanDiet(no_rawat)

            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: "Data tidak ditemukan"
                });
            }

            return res.json({
                success: true,
                message: "Data Permintaan Diet berhasil diambil",
                data
            });

        } catch (error) {
            console.error("Controller Error:", error.message);

            return res.status(500).json({
                success: false,
                message: "Terjadi kesalahan pada server",
                error: error.message
            });
        }
    },

    getAwalMedisInap: async (req, res) => {
        try {
            const { no_rawat } = req.body || {};

            // Validasi input
            if (!no_rawat || no_rawat.trim() === "") {
                return res.status(400).json({
                    success: false,
                    message: "Field no_rawat wajib diisi"
                });
            }

            const data = await ranap.awalMedisRanap(no_rawat)

            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: "Data tidak ditemukan"
                });
            }

            return res.json({
                success: true,
                message: "Data Awal Medis Ranap berhasil diambil",
                data
            });

        } catch (error) {
            console.error("Controller Error:", error.message);

            return res.status(500).json({
                success: false,
                message: "Terjadi kesalahan pada server",
                error: error.message
            });
        }
    },

    getAwalKepRanap: async (req, res) => {
        try {
            const { no_rawat } = req.body || {};

            // Validasi input
            if (!no_rawat || no_rawat.trim() === "") {
                return res.status(400).json({
                    success: false,
                    message: "Field no_rawat wajib diisi"
                });
            }

            const data = await ranap.awalKepRanap(no_rawat)

            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: "Data tidak ditemukan"
                });
            }

            return res.json({
                success: true,
                message: "Data Awal Keperawatan Ranap berhasil diambil",
                data
            });

        } catch (error) {
            console.error("Controller Error:", error.message);

            return res.status(500).json({
                success: false,
                message: "Terjadi kesalahan pada server",
                error: error.message
            });
        }
    },
    

}