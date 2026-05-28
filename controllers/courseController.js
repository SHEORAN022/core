
// const Course = require(
//   "../models/Course"
// );

// const uploadToBunny = require(
//   "../config/bunny"
// );


// // ===============================
// // CREATE COURSE
// // ===============================

// exports.createCourse =
//   async (req, res) => {

//     try {

//       const {

//         exam,

//         title,

//         category,

//         stats,

//         progress,

//         icon,

//         themeColor,

//         chapters,

//         status,

//       } = req.body;


//       // VALIDATION

//       if (
//         !exam ||
//         !title
//       ) {

//         return res.status(400).json({

//           success: false,

//           message:
//             "Exam and title are required",

//         });

//       }


//       // IMAGE

//       let image = "";

//       if (req.file) {

//         image =
//           await uploadToBunny(
//             req.file,
//             "courses"
//           );

//       }


//       // CHAPTERS PARSE

//       let parsedChapters =
//         [];

//       if (chapters) {

//         try {

//           parsedChapters =
//             JSON.parse(
//               chapters
//             );

//         } catch (err) {

//           parsedChapters = [];

//         }

//       }


//       // CREATE COURSE

//       const course =
//         await Course.create({

//           exam,

//           title,

//           category,

//           stats,

//           progress,

//           icon,

//           themeColor,

//           chapters:
//             parsedChapters,

//           status,

//           image,

//         });


//       // RESPONSE

//       res.status(201).json({

//         success: true,

//         message:
//           "Course created successfully",

//         course,

//       });

//     } catch (error) {

//       console.log(error);

//       res.status(500).json({

//         success: false,

//         message:
//           error.message,

//       });

//     }

//   };


// // ===============================
// // GET ALL COURSES
// // ===============================

// exports.getAllCourses =
//   async (req, res) => {

//     try {

//       const courses =
//         await Course.find()

//           .populate(
//             "exam",
//             "name"
//           )

//           .sort({
//             createdAt: -1,
//           });

//       res.status(200).json({

//         success: true,

//         total:
//           courses.length,

//         courses,

//       });

//     } catch (error) {

//       console.log(error);

//       res.status(500).json({

//         success: false,

//         message:
//           error.message,

//       });

//     }

//   };


// // ===============================
// // GET SINGLE COURSE
// // ===============================

// exports.getSingleCourse =
//   async (req, res) => {

//     try {

//       const course =
//         await Course.findById(
//           req.params.id
//         ).populate(
//           "exam",
//           "name"
//         );

//       if (!course) {

//         return res.status(404).json({

//           success: false,

//           message:
//             "Course not found",

//         });

//       }


//       // SORT CHAPTERS

//       course.chapters.sort(
//         (a, b) =>
//           a.index - b.index
//       );


//       // RESPONSE

//       res.status(200).json({

//         success: true,

//         course,

//       });

//     } catch (error) {

//       console.log(error);

//       res.status(500).json({

//         success: false,

//         message:
//           error.message,

//       });

//     }

//   };


// // ===============================
// // GET COURSES BY EXAM
// // ===============================

// exports.getCoursesByExam =
//   async (req, res) => {

//     try {

//       const courses =
//         await Course.find({

//           exam:
//             req.params.examId,

//         })

//           .populate(
//             "exam",
//             "name"
//           )

//           .sort({
//             createdAt: -1,
//           });

//       res.status(200).json({

//         success: true,

//         courses,

//       });

//     } catch (error) {

//       console.log(error);

//       res.status(500).json({

//         success: false,

//         message:
//           error.message,

//       });

//     }

//   };


// // ===============================
// // UPDATE COURSE
// // ===============================

// exports.updateCourse =
//   async (req, res) => {

//     try {

//       const course =
//         await Course.findById(
//           req.params.id
//         );

//       if (!course) {

//         return res.status(404).json({

//           success: false,

//           message:
//             "Course not found",

//         });

//       }


//       const {

//         exam,

//         title,

//         category,

//         stats,

//         progress,

//         icon,

//         themeColor,

//         chapters,

//         status,

//       } = req.body;


//       // IMAGE

//       let image =
//         course.image;

//       if (req.file) {

//         image =
//           await uploadToBunny(
//             req.file,
//             "courses"
//           );

//       }


//       // CHAPTERS PARSE

//       let parsedChapters =
//         course.chapters;

//       if (chapters) {

//         try {

//           parsedChapters =
//             JSON.parse(
//               chapters
//             );

//         } catch (err) {

//           parsedChapters =
//             course.chapters;

//         }

//       }


//       // UPDATE

//       course.exam =
//         exam || course.exam;

//       course.title =
//         title || course.title;

//       course.category =
//         category ||
//         course.category;

//       course.stats =
//         stats || course.stats;

//       course.progress =
//         progress ||
//         course.progress;

//       course.icon =
//         icon || course.icon;

//       course.themeColor =
//         themeColor ||
//         course.themeColor;

//       course.chapters =
//         parsedChapters;

//       course.status =
//         status ||
//         course.status;

//       course.image =
//         image;


//       // SAVE

//       await course.save();


//       // RESPONSE

//       res.status(200).json({

//         success: true,

//         message:
//           "Course updated successfully",

//         course,

//       });

//     } catch (error) {

//       console.log(error);

//       res.status(500).json({

//         success: false,

//         message:
//           error.message,

//       });

//     }

//   };


// // ===============================
// // DELETE COURSE
// // ===============================

// exports.deleteCourse =
//   async (req, res) => {

//     try {

//       const course =
//         await Course.findById(
//           req.params.id
//         );

//       if (!course) {

//         return res.status(404).json({

//           success: false,

//           message:
//             "Course not found",

//         });

//       }


//       // DELETE

//       await course.deleteOne();


//       // RESPONSE

//       res.status(200).json({

//         success: true,

//         message:
//           "Course deleted successfully",

//       });

//     } catch (error) {

//       console.log(error);

//       res.status(500).json({

//         success: false,

//         message:
//           error.message,

//       });

//     }

//   };


// // ===============================
// // UPLOAD VIDEO
// // ===============================

// exports.uploadVideo =
//   async (req, res) => {

//     try {

//       if (!req.file) {

//         return res.status(400).json({

//           success: false,

//           message:
//             "Video file is required",

//         });

//       }


//       // VIDEO VALIDATION

//       const allowedTypes = [

//         "video/mp4",

//         "video/webm",

//         "video/mkv",

//       ];

//       if (
//         !allowedTypes.includes(
//           req.file.mimetype
//         )
//       ) {

//         return res.status(400).json({

//           success: false,

//           message:
//             "Invalid video format",

//         });

//       }


//       // UPLOAD VIDEO

//       const videoUrl =
//         await uploadToBunny(
//           req.file,
//           "videos"
//         );


//       // RESPONSE

//       res.status(200).json({

//         success: true,

//         videoUrl,

//       });

//     } catch (error) {

//       console.log(error);

//       res.status(500).json({

//         success: false,

//         message:
//           error.message,

//       });

//     }

//   };


const Course = require("../models/Course");
const uploadToBunny = require("../config/bunny");
exports.createCourse = async (req, res) => {
  try {
    const { exam, title, category, stats, themeColor, chapters, status } = req.body;

    if (!exam || !title) {
      return res.status(400).json({
        success: false,
        message: "Exam and title are required",
      });
    }

    let image = "";
    if (req.file) {
      image = await uploadToBunny(req.file, "courses");
    }

    let parsedChapters = [];
    if (chapters) {
      try {
        parsedChapters = JSON.parse(chapters);
      } catch (err) {
        parsedChapters = [];
      }
    }

    const course = await Course.create({
      exam,
      title,
      category,
      stats,
      themeColor,
      chapters: parsedChapters,
      status,
      image,
    });

    const populated = await Course.findById(course._id).populate("exam", "name");

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course: populated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// GET ALL COURSES
// ===============================

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("exam", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: courses.length,
      courses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// GET SINGLE COURSE
// ===============================

exports.getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("exam", "name");

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    course.chapters.sort((a, b) => a.index - b.index);

    res.status(200).json({ success: true, course });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// GET COURSES BY EXAM
// ===============================

exports.getCoursesByExam = async (req, res) => {
  try {
    const courses = await Course.find({ exam: req.params.examId })
      .populate("exam", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// UPDATE COURSE
// ===============================

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const { exam, title, category, stats, themeColor, chapters, status } = req.body;

    let image = course.image;
    if (req.file) {
      image = await uploadToBunny(req.file, "courses");
    }

    let parsedChapters = course.chapters;
    if (chapters) {
      try {
        parsedChapters = JSON.parse(chapters);
      } catch (err) {
        parsedChapters = course.chapters;
      }
    }

    course.exam = exam || course.exam;
    course.title = title || course.title;
    course.category = category || course.category;
    course.stats = stats !== undefined ? stats : course.stats;
    course.themeColor = themeColor || course.themeColor;
    course.chapters = parsedChapters;
    course.status = status || course.status;
    course.image = image;

    await course.save();

    const populated = await Course.findById(course._id).populate("exam", "name");

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course: populated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// DELETE COURSE
// ===============================

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    await course.deleteOne();

    res.status(200).json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// UPLOAD VIDEO
// ===============================

exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Video file is required" });
    }

    const allowedTypes = ["video/mp4", "video/webm", "video/mkv"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ success: false, message: "Invalid video format. Use mp4, webm or mkv" });
    }

    const videoUrl = await uploadToBunny(req.file, "videos");

    res.status(200).json({ success: true, videoUrl });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// ADD CHAPTER
// ===============================

exports.addChapter = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: "Chapter title is required" });
    }

    const index = course.chapters.length + 1;
    course.chapters.push({ title, description: description || "", index, videos: [] });
    await course.save();

    const populated = await Course.findById(course._id).populate("exam", "name");
    res.status(201).json({ success: true, message: "Chapter added", course: populated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// UPDATE CHAPTER
// ===============================

exports.updateChapter = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const chapter = course.chapters.id(req.params.chapterId);
    if (!chapter) {
      return res.status(404).json({ success: false, message: "Chapter not found" });
    }

    const { title, description } = req.body;
    if (title) chapter.title = title;
    if (description !== undefined) chapter.description = description;

    await course.save();
    const populated = await Course.findById(course._id).populate("exam", "name");
    res.status(200).json({ success: true, message: "Chapter updated", course: populated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// DELETE CHAPTER
// ===============================

exports.deleteChapter = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    course.chapters = course.chapters.filter(
      (ch) => ch._id.toString() !== req.params.chapterId
    );

    // Re-index
    course.chapters.forEach((ch, i) => { ch.index = i + 1; });
    await course.save();

    const populated = await Course.findById(course._id).populate("exam", "name");
    res.status(200).json({ success: true, message: "Chapter deleted", course: populated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// ADD VIDEO TO CHAPTER
// ===============================

exports.addVideo = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const chapter = course.chapters.id(req.params.chapterId);
    if (!chapter) {
      return res.status(404).json({ success: false, message: "Chapter not found" });
    }

    const { title, videoUrl, thumbnail, duration } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: "Video title is required" });
    }
    if (!videoUrl) {
      return res.status(400).json({ success: false, message: "Video URL is required" });
    }

    chapter.videos.push({ title, videoUrl, thumbnail: thumbnail || "", duration: duration || "" });
    await course.save();

    const populated = await Course.findById(course._id).populate("exam", "name");
    res.status(201).json({ success: true, message: "Video added", course: populated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// UPDATE VIDEO
// ===============================

exports.updateVideo = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const chapter = course.chapters.id(req.params.chapterId);
    if (!chapter) {
      return res.status(404).json({ success: false, message: "Chapter not found" });
    }

    const video = chapter.videos.id(req.params.videoId);
    if (!video) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }

    const { title, videoUrl, thumbnail, duration } = req.body;
    if (title) video.title = title;
    if (videoUrl) video.videoUrl = videoUrl;
    if (thumbnail !== undefined) video.thumbnail = thumbnail;
    if (duration !== undefined) video.duration = duration;

    await course.save();
    const populated = await Course.findById(course._id).populate("exam", "name");
    res.status(200).json({ success: true, message: "Video updated", course: populated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// DELETE VIDEO
// ===============================

exports.deleteVideo = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const chapter = course.chapters.id(req.params.chapterId);
    if (!chapter) {
      return res.status(404).json({ success: false, message: "Chapter not found" });
    }

    chapter.videos = chapter.videos.filter(
      (v) => v._id.toString() !== req.params.videoId
    );

    await course.save();
    const populated = await Course.findById(course._id).populate("exam", "name");
    res.status(200).json({ success: true, message: "Video deleted", course: populated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};