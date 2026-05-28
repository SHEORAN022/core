const Exam = require("../models/Exam");
const uploadToBunny = require("../config/bunny");
const makeSlug = (name) =>
  name.trim().toLowerCase().replace(/\s+/g, "-");
exports.createExam = async (req, res) => {
  try {

    const { name, description, status } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Exam name is required",
      });
    }

    const slug = makeSlug(name);

    const existingExam = await Exam.findOne({ slug });
    if (existingExam) {
      return res.status(400).json({
        success: false,
        message: "Exam with this name already exists",
      });
    }

    let image = "";
    if (req.file) {
      image = await uploadToBunny(req.file, "exams");
    }

    const exam = await Exam.create({
      name,
      slug,
      description,
      status,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Exam created successfully",
      exam,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// ─── GET ALL EXAMS ─────────────────────────────────────────────

exports.getAllExams = async (req, res) => {
  try {

    const exams = await Exam.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: exams.length,
      exams,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// ─── GET SINGLE EXAM ───────────────────────────────────────────

exports.getSingleExam = async (req, res) => {
  try {

    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    res.status(200).json({ success: true, exam });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// ─── UPDATE EXAM ───────────────────────────────────────────────

exports.updateExam = async (req, res) => {
  try {

    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    const { name, description, status } = req.body;

    let image = exam.image;
    if (req.file) {
      image = await uploadToBunny(req.file, "exams");
    }

    exam.name        = name        || exam.name;
    exam.slug        = name ? makeSlug(name) : exam.slug;
    exam.description = description !== undefined ? description : exam.description;
    exam.status      = status      || exam.status;
    exam.image       = image;

    await exam.save();

    res.status(200).json({
      success: true,
      message: "Exam updated successfully",
      exam,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// ─── DELETE EXAM ───────────────────────────────────────────────

exports.deleteExam = async (req, res) => {
  try {

    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    await exam.deleteOne();

    res.status(200).json({
      success: true,
      message: "Exam deleted successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// ===============================================================
//  SUBJECT CRUD
// ===============================================================


// ─── ADD SUBJECT ───────────────────────────────────────────────

exports.addSubject = async (req, res) => {
  try {

    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Subject name is required",
      });
    }

    // exam.subjects.push({ name });
    exam.subjects.push({

  name: String(name).trim(),

  chapters: [],

});
    await exam.save();

    // return the newly added subject
    const newSubject =
      exam.subjects[exam.subjects.length - 1];

    res.status(201).json({
      success: true,
      message: "Subject added successfully",
      subject: newSubject,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// ─── GET ALL SUBJECTS ──────────────────────────────────────────

exports.getAllSubjects = async (req, res) => {
  try {

    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    res.status(200).json({
      success: true,
      total: exam.subjects.length,
      subjects: exam.subjects,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// ─── UPDATE SUBJECT ────────────────────────────────────────────

exports.updateSubject = async (req, res) => {
  try {

    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    const subject = exam.subjects.id(req.params.subjectId);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    const { name } = req.body;

    if (name) subject.name = name;

    await exam.save();

    res.status(200).json({
      success: true,
      message: "Subject updated successfully",
      subject,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// ─── DELETE SUBJECT ────────────────────────────────────────────

exports.deleteSubject = async (req, res) => {
  try {

    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    const subject = exam.subjects.id(req.params.subjectId);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    subject.deleteOne();
    await exam.save();

    res.status(200).json({
      success: true,
      message: "Subject deleted successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// ===============================================================
//  CHAPTER CRUD
// ===============================================================


// ─── ADD CHAPTER ───────────────────────────────────────────────

exports.addChapter = async (req, res) => {
  try {

    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    const subject = exam.subjects.id(req.params.subjectId);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    const { title, index } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Chapter title is required",
      });
    }

    let image = "";
    if (req.file) {
      image = await uploadToBunny(req.file, "chapters");
    }

    subject.chapters.push({
      title,
      index: index ? Number(index) : 1,
      image,
    });

    await exam.save();

    const newChapter =
      subject.chapters[subject.chapters.length - 1];

    res.status(201).json({
      success: true,
      message: "Chapter added successfully",
      chapter: newChapter,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// ─── GET ALL CHAPTERS ──────────────────────────────────────────

exports.getAllChapters = async (req, res) => {
  try {

    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    const subject = exam.subjects.id(req.params.subjectId);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    res.status(200).json({
      success: true,
      total: subject.chapters.length,
      chapters: subject.chapters,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// ─── UPDATE CHAPTER ────────────────────────────────────────────

exports.updateChapter = async (req, res) => {
  try {

    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    const subject = exam.subjects.id(req.params.subjectId);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    const chapter = subject.chapters.id(req.params.chapterId);

    if (!chapter) {
      return res.status(404).json({
        success: false,
        message: "Chapter not found",
      });
    }

    const { title, index } = req.body;

    if (title) chapter.title = title;
    if (index) chapter.index = Number(index);

    if (req.file) {
      chapter.image = await uploadToBunny(req.file, "chapters");
    }

    await exam.save();

    res.status(200).json({
      success: true,
      message: "Chapter updated successfully",
      chapter,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// ─── DELETE CHAPTER ────────────────────────────────────────────

exports.deleteChapter = async (req, res) => {
  try {

    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    const subject = exam.subjects.id(req.params.subjectId);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    const chapter = subject.chapters.id(req.params.chapterId);

    if (!chapter) {
      return res.status(404).json({
        success: false,
        message: "Chapter not found",
      });
    }

    chapter.deleteOne();
    await exam.save();

    res.status(200).json({
      success: true,
      message: "Chapter deleted successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};