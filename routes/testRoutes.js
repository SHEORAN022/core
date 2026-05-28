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

// ===============================
// TEST ROUTES
// ===============================

router.post(
  "/create",
  createTest
);

router.get(
  "/all",
  getAllTests
);

router.get(
  "/single/:id",
  getSingleTest
);

router.put(
  "/update/:id",
  updateTest
);

router.delete(
  "/delete/:id",
  deleteTest
);

module.exports =
  router;