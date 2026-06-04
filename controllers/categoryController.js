// controllers/categoryController.js

const Category =
  require("../models/Category");

// =================================
// CREATE CATEGORY
// =================================

exports.createCategory =
  async (req, res) => {

    try {

      const {
        name,
        status,
      } = req.body;

      // ======================
      // VALIDATION
      // ======================

      if (!name) {

        return res.status(400).json({

          success: false,

          message:
            "Category name is required",

        });

      }

      // ======================
      // CHECK EXISTING
      // ======================

      const existingCategory =
        await Category.findOne({
          name,
        });

      if (existingCategory) {

        return res.status(400).json({

          success: false,

          message:
            "Category already exists",

        });

      }

      // ======================
      // CREATE CATEGORY
      // ======================

      const category =
        await Category.create({

          name,

          status,

        });

      // ======================
      // RESPONSE
      // ======================

      res.status(201).json({

        success: true,

        message:
          "Category Created Successfully",

        data:
          category,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

// =================================
// GET ALL CATEGORIES
// =================================

exports.getCategories =
  async (req, res) => {

    try {

      const categories =
        await Category.find()

          .sort({
            createdAt: -1,
          });

      res.status(200).json({

        success: true,

        total:
          categories.length,

        data:
          categories,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

// =================================
// GET SINGLE CATEGORY
// =================================

exports.getSingleCategory =
  async (req, res) => {

    try {

      const category =
        await Category.findById(
          req.params.id
        );

      if (!category) {

        return res.status(404).json({

          success: false,

          message:
            "Category Not Found",

        });

      }

      res.status(200).json({

        success: true,

        data:
          category,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

// =================================
// UPDATE CATEGORY
// =================================

exports.updateCategory =
  async (req, res) => {

    try {

      const category =
        await Category.findByIdAndUpdate(

          req.params.id,

          req.body,

          {

            new: true,

            runValidators: true,

          }

        );

      if (!category) {

        return res.status(404).json({

          success: false,

          message:
            "Category Not Found",

        });

      }

      res.status(200).json({

        success: true,

        message:
          "Category Updated Successfully",

        data:
          category,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

// =================================
// DELETE CATEGORY
// =================================

exports.deleteCategory =
  async (req, res) => {

    try {

      const category =
        await Category.findByIdAndDelete(
          req.params.id
        );

      if (!category) {

        return res.status(404).json({

          success: false,

          message:
            "Category Not Found",

        });

      }

      res.status(200).json({

        success: true,

        message:
          "Category Deleted Successfully",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };