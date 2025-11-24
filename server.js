require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const routes = require("./src/routes/login");
const ralan = require("./src/routes/rawatJalan");
const pasien = require("./src/routes/pasien");
const ranap = require("./src/routes/rawatInap");
const ibs = require("./src/routes/ibs");
const akses = require("./src/routes/akses");
const logRequest = require("./src/utils/logger");

const app = express();
app.use(cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Session =====
app.use(session({
    secret: process.env.SESSION_SECRET || "superrandomsecret",
    resave: true,   // reset idle timeout
    saveUninitialized: true,
    cookie: { maxAge: (parseInt(process.env.SESSION_IDLE_EXPIRE_MIN) || 10) * 60 * 1000 } // default 10 menit
}));

function authSession(req, res, next) {
    if (req.session.loggedIn) {
        req.session.touch();
        return next();
    }

    // Jika request API → balikan JSON error, jangan redirect
    if (req.originalUrl.startsWith("/api")) {
        return res.status(401).json({ success: false, message: "Session expired" });
    }

    // Jika halaman biasa → redirect
    return res.redirect("/login");
}


// ===== Routes =====

// login page
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "src/public/login.html"));
});

// login submit
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === process.env.LOG_USER && password === process.env.LOG_PASS) {
        req.session.loggedIn = true;
        req.session.user = username;
        return res.redirect("/");
    } else {
        return res.status(401).send("Username atau password salah");
    }
});

// logout
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});

// dashboard
app.get("/", authSession, (req, res) => {
    res.sendFile(path.join(__dirname, "src/public/index.html"));
});

// ambil log lama
app.get("/api/logs", authSession, (req, res) => {
    const logFile = path.join(__dirname, "logs/access.json");
    if (!fs.existsSync(logFile)) return res.json([]);

    const data = fs.readFileSync(logFile, "utf8");
    const lines = data.trim().split("\n").filter(Boolean);
    const logs = lines.map(line => JSON.parse(line));
    return res.json(logs);
});

// ===== Logging middleware =====
app.use(async (req, res, next) => {
    const start = Date.now();

    res.on("finish", async () => {
        const responseTime = Date.now() - start;
        const ip = req.ip;

        let user = "Guest";

        // 1️ Cek session
        if (req.session?.user) {
            user = req.session.user;
        }
        // 2️ Cek JWT di header Authorization
        else if (req.headers.authorization) {
            const authHeader = req.headers.authorization.split(" ")[1];
            try {
                const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
                user = decoded.nm_user || decoded.nip || "JWT Guest";
            } catch (err) {
                // token invalid → biarkan user tetap Guest
            }
        }

        // simpan ke file
        logRequest({
            user,
            method: req.method,
            url: req.originalUrl,
            ip,
            status: res.statusCode,
            responseTime,
        });

        // kirim realtime ke dashboard
        io.emit("newLog", {
            timestamp: new Date().toISOString(), // <-- ISO string
            user,
            method: req.method,
            url: req.originalUrl,
            ip,
            status: res.statusCode,
            responseTime,
        });
    });

    next();
});


// ===== Static folder =====
app.use(express.static(path.join(__dirname, "src/public")));

// ===== Routes API lain =====
app.use("/api", routes);
app.use("/api/akses", akses);
app.use("/api/rm", ralan);
app.use("/api/rm", ibs);
app.use("/api/rm", ranap);
app.use("/api/pasien", pasien);

// ===== Global 404 & error =====
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Endpoint tidak ditemukan" });
});
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err.stack);
    if (!res.headersSent) {
        res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
    }
});

// ===== Socket.io =====
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
});

// ===== Start server =====
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
