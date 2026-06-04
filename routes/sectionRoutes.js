
const express =
  require("express");

const router =
  express.Router();

// =====================================
// MIDDLEWARE
// =====================================

const {

  protectAdmin,

  userAuth,

} = require(

  "../middleware/authMiddleware"

);

// =====================================
// CONTROLLER
// =====================================

const {

  createSection,

  getSections,

  getAdminSections,

  getSingleSection,

  updateSection,

  deleteSection,

  addSubjectToSection,

  removeSubjectFromSection,

} = require(

  "../controllers/sectionController"

);



router.post(

  "/create",

  protectAdmin,

  createSection

);



router.get(

  "/admin/all",

  getAdminSections

);



router.get(

  "/",

  userAuth,

  getSections

);


router.get(

  "/:id",

  userAuth,

  getSingleSection

);



router.put(

  "/:id",

  protectAdmin,

  updateSection

);


router.delete(

  "/:id",

  protectAdmin,

  deleteSection

);

router.post(

  "/:id/add-subject",

  protectAdmin,

  addSubjectToSection

);


router.post(

  "/:id/remove-subject",

  protectAdmin,

  removeSubjectFromSection

);



module.exports =
  router;