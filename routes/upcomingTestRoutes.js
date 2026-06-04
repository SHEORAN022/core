const express =
  require("express");

const router =
  express.Router();

const {

  getUpcomingTests,

} = require(

  "../controllers/upcomingTestController"

);

// ======================================
// GET UPCOMING TESTS
// ======================================

router.get(

  "/",

  getUpcomingTests

);

module.exports =
  router;