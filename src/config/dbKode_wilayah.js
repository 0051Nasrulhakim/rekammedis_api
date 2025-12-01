const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_KD_WILAYAH,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
});

// 🔍 Test koneksi
(async () => {
    try {
        const conn = await pool.getConnection();
        console.log("✅ MySQL Connected!");
        conn.release();
    } catch (err) {
        console.error("❌ MySQL Connection Failed:", err.message);
    }
})();

module.exports = pool;
