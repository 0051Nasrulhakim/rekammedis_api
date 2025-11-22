const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const controller = require("../controllers/rawatJalan/C_rawatJalan");

// Pakai middleware auth di route ini
router.post("/ralan/awalMedis", auth, controller.getAwalMedisRalan);
router.post("/ralan/awalMedisIgd", auth, controller.getAwalMedisIGD);
router.post("/ralan/awalKepRalan", auth, controller.getAwalKeperawatanRalan);
router.post("/ralan/awalKepIgd", auth, controller.getAwalKeperawatanIgd);
router.post("/ralan/riwayatSoapDokter", auth, controller.getRiwayatSoapDokter);
router.post("/ralan/riwayatSoap", auth, controller.getRiwayatSoap);

module.exports = router;
