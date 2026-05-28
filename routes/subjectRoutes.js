const express =
  require("express");

const router =
  express.Router();

const upload =
  require(
    "../middleware/upload"
  );

const {

  createSubject,

  getSubjects,

  getSingleSubject,

  updateSubject,

  deleteSubject,

} = require(

  "../controllers/subjectController"

);

// =================================
// CREATE SUBJECT
// =================================

router.post(

  "/create",

  upload.fields([

    {
      name: "image",
      maxCount: 1,
    },

    {
      name: "icon",
      maxCount: 1,
    },

  ]),

  createSubject

);

// =================================
// GET ALL SUBJECTS
// =================================

router.get(

  "/",

  getSubjects

);

// =================================
// GET SINGLE SUBJECT
// =================================

router.get(

  "/:id",

  getSingleSubject

);

// =================================
// UPDATE SUBJECT
// =================================

router.put(

  "/:id",

  upload.fields([

    {
      name: "image",
      maxCount: 1,
    },

    {
      name: "icon",
      maxCount: 1,
    },

  ]),

  updateSubject

);

// =================================
// DELETE SUBJECT
// =================================

router.delete(

  "/:id",

  deleteSubject

);

module.exports =
  router;