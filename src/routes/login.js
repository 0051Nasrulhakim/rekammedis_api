const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const AuthController = require("../controllers/C_auth");
const UserController = require("../controllers/C_user");

router.post("/login", AuthController.login);

// Protected route
router.get("/profile", auth, UserController.profile);

module.exports = router;
