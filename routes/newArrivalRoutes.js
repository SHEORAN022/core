
const express =
  require("express");

const router =
  express.Router();

const {

  protectAdmin,

  userAuth,

} = require(

  "../middleware/authMiddleware"

);

const {

  createNewArrival,

  getNewArrivals,

  getSingleNewArrival,

  updateNewArrival,

  deleteNewArrival,
  getAllNewArrivalsAdmin,

} = require(

  "../controllers/newArrivalController"

);

// =====================================
// CREATE
// =====================================

router.post(

  "/create",

  protectAdmin,

  createNewArrival

);

// =====================================
// GET ALL
// =====================================

router.get(

  "/",

  userAuth,

  getNewArrivals

);

// =====================================
// GET SINGLE
// =====================================

router.get(

  "/:id",

  userAuth,

  getSingleNewArrival

);

// =====================================
// UPDATE
// =====================================

router.put(

  "/:id",

  protectAdmin,

  updateNewArrival

);

// =====================================
// DELETE
// =====================================

router.delete(

  "/:id",

  protectAdmin,

  deleteNewArrival

);
router.get( "/admin/all", getAllNewArrivalsAdmin );

module.exports =
  router;





