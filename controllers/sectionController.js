
const Section = require("../models/Section");
const Subject = require("../models/Subject");

// =====================================
// CREATE SECTION
// =====================================

exports.createSection = async (req, res) => {
  try {
    const {
      exam,
      title,
      type = "subject",
      subtitle = "",
      position = 1,
      columns = 2,
      isHorizontal = false,
      showViewAll = true,
      bannerImage = "",
      isActive = true,
      subjects = [],
    } = req.body;

    // ======================
    // VALIDATION
    // ======================

    if (!exam) {
      return res.status(400).json({
        success: false,
        message: "Exam is required",
      });
    }

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    // ======================
    // VALIDATE SUBJECTS
    // ======================

    let validSubjects = [];

    if (type === "subject" && subjects.length > 0) {
      const foundSubjects = await Subject.find({
        _id: { $in: subjects },
      }).select("_id");

      validSubjects = foundSubjects.map((s) => s._id);
    }

    // ======================
    // CREATE SECTION
    // ======================

    const section = await Section.create({
      exam,
      title,
      type,
      subtitle,
      position,
      columns,
      isHorizontal,
      showViewAll,
      bannerImage,
      isActive,
      subjects: validSubjects,
    });

    // ======================
    // POPULATE
    // ======================

    const populatedSection = await Section.findById(section._id)
      .populate("exam", "name")
      .populate({
        path: "subjects",
        select: "name image icon description status",
      });

    // ======================
    // RESPONSE
    // ======================

    res.status(201).json({
      success: true,
      message: "Section created successfully",
      section: populatedSection,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// GET ALL SECTIONS (USER)
// =====================================

exports.getSections = async (req, res) => {
  try {
    // ======================
    // FILTER
    // ======================

    let filter = {
      isActive: true,
    };

    // ======================
    // EXAM FILTER
    // ======================

    if (req.query.exam) {
      filter.exam = req.query.exam;
    }

    // ======================
    // GET SECTIONS
    // ======================

    const sections = await Section.find(filter)
      .populate("exam", "name")
      .populate({
        path: "subjects",
        select: "name image icon description status",
      })
      .sort({
        position: 1,
      });

    // ======================
    // RESPONSE
    // ======================

    res.status(200).json({
      success: true,
      total: sections.length,
      sections,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// GET ALL SECTIONS (ADMIN)
// =====================================

exports.getAdminSections = async (req, res) => {
  try {
    const sections = await Section.find()
      .populate("exam", "name")
      .populate({
        path: "subjects",
        select: "name image icon description status",
      })
      .sort({
        position: 1,
      });

    res.status(200).json({
      success: true,
      total: sections.length,
      sections,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// GET SINGLE SECTION
// =====================================

exports.getSingleSection = async (req, res) => {
  try {
    const section = await Section.findById(req.params.id)
      .populate("exam", "name")
      .populate({
        path: "subjects",
        select: "name image icon description status",
      });

    // ======================
    // CHECK
    // ======================

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // ======================
    // RESPONSE
    // ======================

    res.status(200).json({
      success: true,
      section,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// UPDATE SECTION
// =====================================

exports.updateSection = async (req, res) => {
  try {
    const {
      exam,
      title,
      type,
      subtitle,
      position,
      columns,
      isHorizontal,
      showViewAll,
      bannerImage,
      isActive,
      subjects = [],
    } = req.body;

    // ======================
    // FIND SECTION
    // ======================

    const section = await Section.findById(req.params.id);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // ======================
    // VALIDATE SUBJECTS
    // ======================

    let validSubjects = [];

    if (type === "subject" && subjects.length > 0) {
      const foundSubjects = await Subject.find({
        _id: { $in: subjects },
      }).select("_id");

      validSubjects = foundSubjects.map((s) => s._id);
    }

    // ======================
    // UPDATE FIELDS
    // ======================

    section.exam =
      exam !== undefined
        ? exam
        : section.exam;

    section.title =
      title !== undefined
        ? title
        : section.title;

    section.type =
      type !== undefined
        ? type
        : section.type;

    section.subtitle =
      subtitle !== undefined
        ? subtitle
        : section.subtitle;

    section.position =
      position !== undefined
        ? position
        : section.position;

    section.columns =
      columns !== undefined
        ? columns
        : section.columns;

    section.isHorizontal =
      isHorizontal !== undefined
        ? isHorizontal
        : section.isHorizontal;

    section.showViewAll =
      showViewAll !== undefined
        ? showViewAll
        : section.showViewAll;

    section.bannerImage =
      bannerImage !== undefined
        ? bannerImage
        : section.bannerImage;

    section.isActive =
      isActive !== undefined
        ? isActive
        : section.isActive;

    // ======================
    // UPDATE SUBJECTS
    // ======================

    if (type === "subject") {
      section.subjects = validSubjects;
    } else {
      section.subjects = [];
    }

    // ======================
    // SAVE
    // ======================

    await section.save();

    // ======================
    // POPULATE UPDATED DATA
    // ======================

    const updatedSection = await Section.findById(section._id)
      .populate("exam", "name")
      .populate({
        path: "subjects",
        select: "name image icon description status",
      });

    // ======================
    // RESPONSE
    // ======================

    res.status(200).json({
      success: true,
      message: "Section updated successfully",
      section: updatedSection,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// DELETE SECTION
// =====================================

exports.deleteSection = async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);

    // ======================
    // CHECK
    // ======================

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // ======================
    // DELETE
    // ======================

    await section.deleteOne();

    // ======================
    // RESPONSE
    // ======================

    res.status(200).json({
      success: true,
      message: "Section deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// ADD SUBJECT TO SECTION
// =====================================

exports.addSubjectToSection = async (req, res) => {
  try {
    const { subjectId } = req.body;

    // ======================
    // VALIDATION
    // ======================

    if (!subjectId) {
      return res.status(400).json({
        success: false,
        message: "Subject ID is required",
      });
    }

    // ======================
    // FIND SECTION
    // ======================

    const section = await Section.findById(req.params.id);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // ======================
    // FIND SUBJECT
    // ======================

    const subject = await Subject.findById(subjectId);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    // ======================
    // ALREADY EXISTS
    // ======================

    const exists = section.subjects.some(
      (item) => item.toString() === subjectId
    );

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Subject already added",
      });
    }

    // ======================
    // ADD SUBJECT
    // ======================

    section.subjects.push(subjectId);

    await section.save();

    // ======================
    // RESPONSE
    // ======================

    res.status(200).json({
      success: true,
      message: "Subject added successfully",
      section,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// REMOVE SUBJECT FROM SECTION
// =====================================

exports.removeSubjectFromSection = async (req, res) => {
  try {
    const { subjectId } = req.body;

    // ======================
    // VALIDATION
    // ======================

    if (!subjectId) {
      return res.status(400).json({
        success: false,
        message: "Subject ID is required",
      });
    }

    // ======================
    // FIND SECTION
    // ======================

    const section = await Section.findById(req.params.id);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // ======================
    // REMOVE SUBJECT
    // ======================

    section.subjects = section.subjects.filter(
      (item) => item.toString() !== subjectId
    );

    // ======================
    // SAVE
    // ======================

    await section.save();

    // ======================
    // RESPONSE
    // ======================

    res.status(200).json({
      success: true,
      message: "Subject removed successfully",
      section,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};