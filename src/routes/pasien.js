const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const controller = require("../controllers/C_pasien");

// Pakai middleware auth di route ini
router.post("/getNorm", auth, controller.getNorm);

module.exports = router;
