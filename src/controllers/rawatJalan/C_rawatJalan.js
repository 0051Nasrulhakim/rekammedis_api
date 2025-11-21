const M_rawatJalan = require("../../models/rawat_jalan/M_rawatJalan");

module.exports = {

    getAwalMedisRalan: async (req, res) => {
        try {
            const { no_rawat } = req.body || {};

            // Validasi input
            if (!no_rawat || no_rawat.trim() === "") {
                return res.status(400).json({
                    success: false,
                    message: "Field no_rawat wajib diisi"
                });
            }

            const data = await M_rawatJalan.awalMedisRalan(no_rawat);

            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: "Data tidak ditemukan"
                });
            }

            return res.json({
                success: true,
                message: "Data Awal Medis Ralan berhasil diambil",
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
    getAwalMedisIGD: async (req, res) => {
        try {
            const { no_rawat } = req.body || {};

            // Validasi input
            if (!no_rawat || no_rawat.trim() === "") {
                return res.status(400).json({
                    success: false,
                    message: "Field no_rawat wajib diisi"
                });
            }

            const data = await M_rawatJalan.awalMedisIgd(no_rawat);

            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: "Data tidak ditemukan"
                });
            }

            return res.json({
                success: true,
                message: "Data Awal Medis IGD berhasil diambil",
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
    getAwalKeperawatanRalan: async (req, res) => {
        try {
            const { no_rawat } = req.body || {};

            // Validasi input
            if (!no_rawat || no_rawat.trim() === "") {
                return res.status(400).json({
                    success: false,
                    message: "Field no_rawat wajib diisi"
                });
            }

            const data = await M_rawatJalan.awalKeperawatanRalan(no_rawat);

            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: "Data tidak ditemukan"
                });
            }

            return res.json({
                success: true,
                message: "Data Awal Keperawatan Ralan berhasil diambil",
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
    getAwalKeperawatanIgd: async (req, res) => {
        try {
            const { no_rawat } = req.body || {};

            // Validasi input
            if (!no_rawat || no_rawat.trim() === "") {
                return res.status(400).json({
                    success: false,
                    message: "Field no_rawat wajib diisi"
                });
            }

            const data = await M_rawatJalan.awalKeperawatanIgd(no_rawat);

            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: "Data tidak ditemukan"
                });
            }

            return res.json({
                success: true,
                message: "Data Awal Keperawatan IGD berhasil diambil",
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

};
