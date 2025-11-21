const pasien = require("../models/pasien");

module.exports = {

    getNorm: async (req, res) => {
        try {
            const { no_rawat } = req.body || {};

            // Validasi input
            if (!no_rawat || no_rawat.trim() === "") {
                return res.status(400).json({
                    success: false,
                    message: "Field no_rawat wajib diisi"
                });
            }

            const data = await pasien.getNorm(no_rawat);

            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: "Data tidak ditemukan"
                });
            }

            return res.json({
                success: true,
                message: "Data Pasien",
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
