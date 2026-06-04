const express = require("express");
const router = express.Router();

// ✅ CHECK KARO: Ye import sahi hai?
const { 
  loginAdmin, 
  registerAdmin,
  getAdminProfile 
} = require("../controllers/adminAuthController"); // ← YE FILE EXIST KARTI HAI?

// ✅ AGAR CONTROLLER EXPORT NHI HUA TOH YEH UNDEFINED HOGA
router.post("/login", loginAdmin); // ← AGAR loginAdmin undefined hai toh error ayega
router.post("/register", registerAdmin);
router.get("/profile", getAdminProfile);

module.exports = router;