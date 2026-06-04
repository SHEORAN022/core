// const express = require("express");
// const router = express.Router();

// const {
//   loginAdmin,
//   registerAdmin,
//   getAdminProfile,
//   getAdmins,
//   getSingleAdmin,
// } = require(
//   "../controllers/adminAuthController"
// );

// // ======================================
// // AUTH
// // ======================================

// router.post(
//   "/login",
//   loginAdmin
// );

// router.post(
//   "/register",
//   registerAdmin
// );

// // ======================================
// // PROFILE
// // ======================================

// router.get(
//   "/profile",
//   getAdminProfile
// );

// // ======================================
// // GET ALL ADMINS
// // ======================================

// router.get(
//   "/",
//   getAdmins
// );

// // ======================================
// // GET SINGLE ADMIN
// // ======================================

// router.get(
//   "/:id",
//   getSingleAdmin
// );

// module.exports =
//   router;


const express = require("express");
const router = express.Router();

const {
  loginAdmin,
  registerAdmin,
  getAdminProfile,
  getAdmins,
  getSingleAdmin,
    updateAdmin,
  deleteAdmin,
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

router.put(
  "/:id",
  updateAdmin
);

router.delete(
  "/:id",
  deleteAdmin
);

module.exports =
  router;


