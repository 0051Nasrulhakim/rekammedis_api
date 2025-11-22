const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const controller = require("../controllers/rawatInap/C_rawatInap");

// Pakai middleware auth di route ini
router.post("/ranap/catatanAdime", auth, controller.getCatatanAdimeGizi);
router.post("/ranap/permintaanDiet", auth, controller.getPermintaanDiet);
router.post("/ranap/awalMedis", auth, controller.getAwalMedisInap);
router.post("/ranap/awalKepRanap", auth, controller.getAwalKepRanap);

module.exports = router;
