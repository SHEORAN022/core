const express = require("express");

const router = express.Router();

const {
  signupAdmin,
  loginAdmin,
} = require("../controllers/adminAuthController");

const protectAdmin = require("../middleware/authMiddleware");


// Signup
router.post("/signup", signupAdmin);

// Login
router.post("/login", loginAdmin);


// Protected Route Example
router.get(
  "/profile",
  protectAdmin,
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Admin profile accessed",
      admin: req.admin,
    });
  }
);

module.exports = router;