// routes/categoryRoutes.js

const express =
  require("express");

const router =
  express.Router();

const {

  createCategory,

  getCategories,

  getSingleCategory,

  updateCategory,

  deleteCategory,

} = require(
  "../controllers/categoryController"
);

// CREATE
router.post(
  "/create",
  createCategory
);

// GET ALL
router.get(
  "/",
  getCategories
);

// GET SINGLE
router.get(
  "/:id",
  getSingleCategory
);

// UPDATE
router.put(
  "/:id",
  updateCategory
);

// DELETE
router.delete(
  "/:id",
  deleteCategory
);

module.exports =
  router;