const fs = require("fs");
const path = require("path");

const logDir = path.join(__dirname, "../../logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

function logRequest({ user, method, url, ip, status, responseTime }) {
    const logFile = path.join(logDir, "access.json");
    const entry = {
        timestamp: new Date().toISOString(),
        user: user || "Guest",
        method,
        url,
        ip,
        status,
        responseTime
    };

    fs.appendFile(logFile, JSON.stringify(entry) + "\n", (err) => {
        if (err) console.error("Gagal menulis log:", err);
    });
}

module.exports = logRequest;
