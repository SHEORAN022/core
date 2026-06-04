// const express = require("express");
// const router = express.Router();

// const {
//   createTeacher,
//   getTeachers,
// } = require("../controllers/teacherController");

// router.post("/create", createTeacher);

// router.get("/", getTeachers);

// module.exports = router;


const express =
  require("express");

const router =
  express.Router();

const {

  createTeacher,

  getTeachers,

  getSingleTeacher,

  updateTeacher,

  deleteTeacher,

} = require(

  "../controllers/teacherController"

);



// ======================================
// CREATE TEACHER
// ======================================

router.post(

  "/create",

  createTeacher

);



// ======================================
// GET ALL TEACHERS
// ======================================

router.get(

  "/",

  getTeachers

);



// ======================================
// GET SINGLE TEACHER
// ======================================

router.get(

  "/:id",

  getSingleTeacher

);



// ======================================
// UPDATE TEACHER
// ======================================

router.put(

  "/:id",

  updateTeacher

);



// ======================================
// DELETE TEACHER
// ======================================

router.delete(

  "/:id",

  deleteTeacher

);



// ======================================
// EXPORT
// ======================================

module.exports =
  router;

