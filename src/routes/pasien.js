const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const controller = require("../controllers/C_pasien");

// Pakai middleware auth di route ini
router.post("/getNorm", auth, controller.getNorm);
router.post("/getDiagnosa", auth, controller.getDiagnosa);
router.post("/statusRegistrasi", auth, controller.getStatusReg);
router.post("/identitas", auth, controller.getPasien);
router.post("/jenisBayar", auth, controller.getJenisBayar);

module.exports = router;
