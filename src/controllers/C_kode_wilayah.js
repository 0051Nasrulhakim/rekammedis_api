const axios = require("axios");

module.exports = {

    getKodeWilayah: async (req, res) => {
        try {
            const { kode, param, name } = req.query;

            // Validasi kode
            if (!kode || kode.trim() === "") {
                return res.status(400).json({
                    success: false,
                    message: "Field kode wajib diisi"
                });
            }

            // Validasi param
            const allowedParams = ["province", "regency", "district", "village"];
            if (!param || !allowedParams.includes(param)) {
                return res.status(400).json({
                    success: false,
                    message: "Field param wajib diisi (province/regency/district/village)"
                });
            }

            // Tentukan endpoint berdasarkan param
            const url = `https://wilayah.id/api/${param}s/${kode}.json`;

            let wilayah = [];

            try {
                const response = await axios.get(url);
                wilayah = response.data.data || [];
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "Gagal mengambil data dari sumber",
                    error: error.message
                });
            }

            // Filter "mengandung kalimat" (case-insensitive)
            if (name && name.trim() !== "") {
                wilayah = wilayah.filter(item =>
                    item.name.toLowerCase().includes(name.toLowerCase())
                );
            }

            return res.json({
                success: true,
                message: `Data ${param} Indonesia`,
                data: wilayah
            });

        } catch (error) {
            console.error("Controller Error:", error.message);

            return res.status(500).json({
                success: false,
                message: "Terjadi kesalahan pada server",
                error: error.message
            });
        }
    }

}
