const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const user = require("../controllers/C_user");


// Protected route
router.post("/isDokter", auth, user.isDokter);

module.exports = router;
