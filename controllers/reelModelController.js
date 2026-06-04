
// const ReelModel =
//   require(
//     "../models/ReelModel"
//   );

// const Teacher =
//   require(
//     "../models/Teacher"
//   );

// // =====================================
// // CREATE REEL
// // =====================================

// const createReel =
//   async (req, res) => {

//     try {

//       const {

//         title,

//         description,

//         videoUrl,

//         thumbnail,

//         type,

//         tags,

//         teacher,

//       } = req.body;

//       // CHECK TEACHER

//       const teacherData =
//         await Teacher.findById(
//           teacher
//         );

//       if (!teacherData) {

//         return res.status(404).json({

//           success: false,

//           message:
//             "Teacher not found",

//         });

//       }

//       // CREATE REEL

//       const reel =
//         await ReelModel.create({

//           title,

//           description,

//           videoUrl,

//           thumbnail,

//           type,

//           tags,

//           teacher,

//         });

//       res.status(201).json({

//         success: true,

//         message:
//           "Reel created successfully",

//         reel,

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

// // =====================================
// // GET ALL REELS
// // =====================================

// const getReels =
//   async (req, res) => {

//     try {

//       const reels =
//         await ReelModel.find()

//           .populate(

//             "teacher",

//             "name username profileImage"

//           )

//           .sort({

//             createdAt: -1,

//           });

//       const formattedReels =
//         reels.map((item) => ({

//           _id:
//             item._id,

//           title:
//             item.title,

//           description:
//             item.description,

//           videoUrl:
//             item.videoUrl,

//           thumbnail:
//             item.thumbnail,

//           likes:
//             item.likes,

//           comments:
//             item.comments,

//           isLiked: false,

//           type:
//             item.type,

//           teacherName:
//             item.teacher?.name || "",

//           teacherUsername:
//             item.teacher?.username || "",

//           teacherProfile:
//             item.teacher?.profileImage || "",

//           tags:
//             item.tags || [],

//         }));

//       res.status(200).json({

//         success: true,

//         message:
//           "Reels fetched successfully",

//         result:
//           formattedReels,

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

// // =====================================
// // DELETE REEL
// // =====================================

// const deleteReel =
//   async (req, res) => {

//     try {

//       await ReelModel.findByIdAndDelete(
//         req.params.id
//       );

//       res.status(200).json({

//         success: true,

//         message:
//           "Reel deleted successfully",

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

// module.exports = {

//   createReel,

//   getReels,

//   deleteReel,

// };
const ReelModel = require("../models/ReelModel");
const Teacher = require("../models/Teacher");

// =====================================
// CREATE REEL
// =====================================
const createReel = async (req, res) => {
  try {
    const {
      title,
      description,
      videoUrl,
      thumbnail,
      type,
      tags,
      teacher,
      subject,
      chapter,
      topic,
      status,
    } = req.body;

    // CHECK TEACHER
    const teacherData = await Teacher.findById(teacher);
    if (!teacherData) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    // PARSE TAGS (array or comma-separated string)
    const parsedTags = Array.isArray(tags)
      ? tags
      : typeof tags === "string"
      ? tags.split(",").map((t) => t.trim()).filter((t) => t !== "")
      : [];

    // CREATE REEL
    const reel = await ReelModel.create({
      title,
      description,
      videoUrl,
      thumbnail,
      type,
      tags: parsedTags,
      teacher,
      subject,
      chapter,
      topic,
      status: status || "Active",
    });

    res.status(201).json({
      success: true,
      message: "Reel created successfully",
      reel,
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
// GET ALL REELS
// =====================================
const getReels = async (req, res) => {
  try {
    const reels = await ReelModel.find()
      .populate("teacher", "name username profileImage teacherName")
      .sort({ createdAt: -1 });

    const formattedReels = reels.map((item) => ({
      _id:            item._id,
      title:          item.title,
      description:    item.description,
      videoUrl:       item.videoUrl,
      thumbnail:      item.thumbnail,
      likes:          item.likes,
      comments:       item.comments,
      isLiked:        false,
      type:           item.type,
      subject:        item.subject || "",
      chapter:        item.chapter || "",
      topic:          item.topic || "",
      status:         item.status,
      teacherName:    item.teacher?.teacherName || item.teacher?.name || "",
      teacherUsername: item.teacher?.username || "",
      teacherProfile: item.teacher?.profileImage || "",
      teacher:        item.teacher?._id || "",
      tags:           item.tags || [],
      createdAt:      item.createdAt,
    }));

    res.status(200).json({
      success: true,
      message: "Reels fetched successfully",
      result: formattedReels,
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
// GET SINGLE REEL BY ID
// =====================================
const getReelById = async (req, res) => {
  try {
    const reel = await ReelModel.findById(req.params.id).populate(
      "teacher",
      "name username profileImage teacherName"
    );

    if (!reel) {
      return res.status(404).json({
        success: false,
        message: "Reel not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reel fetched successfully",
      result: reel,
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
// UPDATE REEL
// =====================================
const updateReel = async (req, res) => {
  try {
    const {
      title,
      description,
      videoUrl,
      thumbnail,
      type,
      tags,
      teacher,
      subject,
      chapter,
      topic,
      status,
    } = req.body;

    // CHECK REEL EXISTS
    const existing = await ReelModel.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Reel not found",
      });
    }

    // CHECK TEACHER IF PROVIDED
    if (teacher) {
      const teacherData = await Teacher.findById(teacher);
      if (!teacherData) {
        return res.status(404).json({
          success: false,
          message: "Teacher not found",
        });
      }
    }

    // PARSE TAGS
    const parsedTags = Array.isArray(tags)
      ? tags
      : typeof tags === "string"
      ? tags.split(",").map((t) => t.trim()).filter((t) => t !== "")
      : existing.tags;

    // UPDATE
    const updated = await ReelModel.findByIdAndUpdate(
      req.params.id,
      {
        title:       title       ?? existing.title,
        description: description ?? existing.description,
        videoUrl:    videoUrl    ?? existing.videoUrl,
        thumbnail:   thumbnail   ?? existing.thumbnail,
        type:        type        ?? existing.type,
        tags:        parsedTags,
        teacher:     teacher     ?? existing.teacher,
        subject:     subject     ?? existing.subject,
        chapter:     chapter     ?? existing.chapter,
        topic:       topic       ?? existing.topic,
        status:      status      ?? existing.status,
      },
      { new: true, runValidators: true }
    ).populate("teacher", "name username profileImage teacherName");

    res.status(200).json({
      success: true,
      message: "Reel updated successfully",
      reel: updated,
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
// DELETE REEL
// =====================================
const deleteReel = async (req, res) => {
  try {
    const reel = await ReelModel.findByIdAndDelete(req.params.id);
    if (!reel) {
      return res.status(404).json({
        success: false,
        message: "Reel not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reel deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createReel,
  getReels,
  getReelById,
  updateReel,
  deleteReel,
};
