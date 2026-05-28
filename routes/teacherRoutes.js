const express = require("express");

const router = express.Router();

const {
    createTeacher,
    getTeachers,
    getSingleTeacher,
    updateTeacher,
    deleteTeacher,
} = require("../controllers/teacherController");


// Create Teacher
router.post("/create", createTeacher);


// Get All Teachers
router.get("/", getTeachers);


// Get Single Teacher
router.get("/:id", getSingleTeacher);


// Update Teacher
router.put("/:id", updateTeacher);


// Delete Teacher
router.delete("/:id", deleteTeacher);


module.exports = router;