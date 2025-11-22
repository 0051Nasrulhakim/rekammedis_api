const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const controller = require("../controllers/ibs/C_ibs");

// Pakai middleware auth di route ini
router.post("/ibs/asuhanPascaBedah", auth, controller.getAsuhanPascaBedah);
router.post("/ibs/asuhanPraBedah", auth, controller.getAsuhanPraBedah);

module.exports = router;
