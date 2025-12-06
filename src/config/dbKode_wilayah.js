const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST_KD_WILAYAH,
    user: process.env.DB_USER_KD_WILAYAH,
    password: process.env.DB_PASS_KD_WILAYAH,
    database: process.env.DB_NAME_KD_WILAYAH,
    port: process.env.DB_PORT_KD_WILAYAH || 3306,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
});

// 🔍 Test koneksi
(async () => {
    try {
        const conn = await pool.getConnection();
        console.log("✅ DB WILAYAH Connected!");
        conn.release();
    } catch (err) {
        console.error("❌ DB WILAYAH Connection Failed:", err.message);
    }
})();

module.exports = pool;
