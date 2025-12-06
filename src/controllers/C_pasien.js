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

    getStatusReg: async (req, res) => {
        try {
            const { no_rawat } = req.body || {};

            // Validasi input
            if (!no_rawat || no_rawat.trim() === "") {
                return res.status(200).json({
                    success: false,
                    message: "Field no_rawat wajib diisi"
                });
            }

            const data = await pasien.getStatusregistrasi(no_rawat);

            if (!data) {
                return res.status(200).json({
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

    getDiagnosa: async (req, res) => {
        try {
            const { no_rawat } = req.body || {};

            // Validasi input
            if (!no_rawat || no_rawat.trim() === "") {
                return res.status(400).json({
                    success: false,
                    message: "Field no_rawat wajib diisi"
                });
            }

            const data = await pasien.diagnosa(no_rawat);

            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: "Data tidak ditemukan"
                });
            }

            return res.json({
                success: true,
                message: "Data DIAGNOSA PASIEN BERHASIL DI AMBIL",
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

    getPasien: async (req, res) => {
        try {
            const { no_rm } = req.body || {};

            // Validasi input
            if (!no_rm || no_rm.trim() === "") {
                return res.status(400).json({
                    success: false,
                    message: "Field no_rm wajib diisi"
                });
            }

            const data = await pasien.getPasien(no_rm);

            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: "Data tidak ditemukan"
                });
            }

            return res.json({
                success: true,
                message: "Data DIAGNOSA PASIEN BERHASIL DI AMBIL",
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
    
    getJenisBayar: async (req, res) => {
        try {
            const { no_rawat } = req.body || {};

            // Validasi input
            if (!no_rawat || no_rawat.trim() === "") {
                return res.status(400).json({
                    success: false,
                    message: "Field no_rawat wajib diisi"
                });
            }

            const data = await pasien.getJenisBayar(no_rawat);

            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: "Data tidak ditemukan"
                });
            }

            return res.json({
                success: true,
                message: "Data JENIS BAYAR PASIEN BERHASIL DI AMBIL",
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
