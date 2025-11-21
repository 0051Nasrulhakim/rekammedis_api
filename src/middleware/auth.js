const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader)
        return res.status(401).json({ message: "Tidak punya akses" });

    const token = authHeader.split(" ")[1];
    if (!token)
        return res.status(401).json({ message: "Token invalid" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // sekarang req.user.nm_user tersedia
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token expired atau tidak valid" });
    }
};
