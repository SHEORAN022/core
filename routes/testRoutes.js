
// const express =
//   require("express");

// const router =
//   express.Router();

// const {

//   createTest,

//   getAllTests,

//   getSingleTest,

//   updateTest,

//   deleteTest,

// } = require(
//   "../controllers/testController"
// );

// // ======================================
// // CREATE TEST
// // ======================================

// router.post(
//   "/create",
//   createTest
// );

// // ======================================
// // GET ALL TESTS
// // ======================================

// router.get(
//   "/all",
//   getAllTests
// );

// // ======================================
// // GET SINGLE TEST
// // ======================================

// router.get(
//   "/single/:id",
//   getSingleTest
// );

// // ======================================
// // UPDATE TEST
// // ======================================

// router.put(
//   "/update/:id",
//   updateTest
// );

// // ======================================
// // DELETE TEST
// // ======================================

// router.delete(
//   "/delete/:id",
//   deleteTest
// );

// module.exports =
//   router;

const express =
  require("express");

const router =
  express.Router();

const {

  createTest,

  getAllTests,

  getSingleTest,

  updateTest,

  deleteTest,

} = require(
  "../controllers/testController"
);

// ======================================
// CREATE TEST
// ======================================

router.post(
  "/create",
  createTest
);

// ======================================
// GET ALL TESTS
// ======================================

router.get(
  "/all",
  getAllTests
);

// ======================================
// GET SINGLE TEST
// ======================================

router.get(
  "/single/:id",
  getSingleTest
);

// ======================================
// UPDATE TEST
// ======================================

router.put(
  "/update/:id",
  updateTest
);

// ======================================
// DELETE TEST
// ======================================

router.delete(
  "/delete/:id",
  deleteTest
);

module.exports =
  router;