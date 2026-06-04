// const express = require("express");
// const router = express.Router();

// // ✅ CHECK KARO: Ye import sahi hai?
// const { 
//   loginAdmin, 
//   registerAdmin,
//   getAdminProfile 
// } = require("../controllers/adminAuthController"); // ← YE FILE EXIST KARTI HAI?

// // ✅ AGAR CONTROLLER EXPORT NHI HUA TOH YEH UNDEFINED HOGA
// router.post("/login", loginAdmin); // ← AGAR loginAdmin undefined hai toh error ayega
// router.post("/register", registerAdmin);
// router.get("/profile", getAdminProfile);

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  loginAdmin,
  registerAdmin,
  getAdminProfile,
  getAdmins,
  getSingleAdmin,
} = require(
  "../controllers/adminAuthController"
);

// ======================================
// AUTH
// ======================================

router.post(
  "/login",
  loginAdmin
);

router.post(
  "/register",
  registerAdmin
);

// ======================================
// PROFILE
// ======================================

router.get(
  "/profile",
  getAdminProfile
);

// ======================================
// GET ALL ADMINS
// ======================================

router.get(
  "/",
  getAdmins
);

// ======================================
// GET SINGLE ADMIN
// ======================================

router.get(
  "/:id",
  getSingleAdmin
);

module.exports =
  router;

