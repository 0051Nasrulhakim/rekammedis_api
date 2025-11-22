const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = {

    login: async (req, res) => {
        try {
            const { nip } = req.body || {};

            if (!nip) {
                return res.status(400).json({
                    success: false,
                    message: "parameter login tidak lengkap"
                });
            }

            const user = await User.getPetugas(nip);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Login Gagal. ERR: 0001",
                });
            }

            // BUAT TOKEN JWT
            const token = jwt.sign(
                { nip: user.nip, nm_user: user.nama },
                process.env.JWT_SECRET,
                { expiresIn: "9h" }
            );

            return res.json({
                success: true,
                message: "Login berhasil",
                token
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: err.message
            });
        }
    }

};
