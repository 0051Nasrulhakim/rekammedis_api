const express = require("express");
const router = express.Router();

const controller = require("../controllers/C_kode_wilayah");


router.get("/kodeLokasi",  controller.getKodeWilayah);

module.exports = router;
