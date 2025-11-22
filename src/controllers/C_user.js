const user = require("../models/user")

module.exports = {
    profile: async (req, res) => {
        res.json({
            message: "Login Berhasil"
        });
    },

    isDokter: async (req, res) => {
            try {
                const { kd_dokter } = req.body || {};
    
                // Validasi input
                if (!kd_dokter || kd_dokter.trim() === "") {
                    return res.status(400).json({
                        success: false,
                        message: "Field kd_dokter wajib diisi"
                    });
                }
    
                const data = await user.isDokter(kd_dokter)
    
                if (!data) {
                    return res.status(404).json({
                        success: false,
                        message: "Data Tidak Ditemukan"
                    });
                }

                // console.log("SESSION DI isDokter:", req.user);
    
                return res.json({
                    success: true,
                    message: "Is dokter",
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
