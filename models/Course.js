
// const mongoose = require("mongoose");


// // ===============================
// // VIDEO SCHEMA
// // ===============================

// const videoSchema =
//   new mongoose.Schema(

//     {

//       title: {

//         type: String,

//         required: true,

//         trim: true,

//       },

//       videoUrl: {

//         type: String,

//         default: "",

//       },

//       thumbnail: {

//         type: String,

//         default: "",

//       },

//       duration: {

//         type: String,

//         default: "",

//       },

//     },

//     {
//       timestamps: true,
//     }

//   );


// // ===============================
// // CHAPTER SCHEMA
// // ===============================

// const chapterSchema =
//   new mongoose.Schema(

//     {

//       title: {

//         type: String,

//         required: true,

//         trim: true,

//       },

//       index: {

//         type: Number,

//         default: 1,

//       },

//       description: {

//         type: String,

//         default: "",

//       },

//       videos: [
//         videoSchema
//       ],

//     },

//     {
//       timestamps: true,
//     }

//   );


// // ===============================
// // COURSE SCHEMA
// // ===============================

// const courseSchema =
//   new mongoose.Schema(

//     {

//       // EXAM

//       exam: {

//         type:
//           mongoose.Schema.Types.ObjectId,

//         ref: "Exam",

//         required: true,

//       },


//       // TITLE

//       title: {

//         type: String,

//         required: true,

//         trim: true,

//       },


//       // CATEGORY

//       category: {

//         type: String,

//         enum: [
//           "Main",
//           "Advanced",
//         ],

//         default: "Main",

//       },


//       // STATS

//       stats: {

//         type: String,

//         default: "",

//       },


//       // PROGRESS

//       progress: {

//         type: Number,

//         default: 0,

//       },


//       // ICON

//       icon: {

//         type: String,

//         default: "school",

//       },


//       // THEME COLOR

//       themeColor: {

//         type: String,

//         default: "#2563eb",

//       },


//       // IMAGE

//       image: {

//         type: String,

//         default: "",

//       },


//       // CHAPTERS

//       chapters: [
//         chapterSchema
//       ],


//       // STATUS

//       status: {

//         type: String,

//         enum: [
//           "Active",
//           "Draft",
//         ],

//         default: "Active",

//       },

//     },

//     {
//       timestamps: true,
//     }

//   );


// // ===============================
// // EXPORT
// // ===============================

// module.exports =
//   mongoose.model(
//     "Course",
//     courseSchema
//   );


const mongoose = require("mongoose");

// ===============================
// VIDEO SCHEMA
// ===============================

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    videoUrl: {
      type: String,
      default: "",
    },
    thumbnail: {
      type: String,
      default: "",
    },
    duration: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// ===============================
// CHAPTER SCHEMA
// ===============================

const chapterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    index: {
      type: Number,
      default: 1,
    },
    description: {
      type: String,
      default: "",
    },
    videos: [videoSchema],
  },
  { timestamps: true }
);

// ===============================
// COURSE SCHEMA
// ===============================

const courseSchema = new mongoose.Schema(
  {
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Main", "Advanced"],
      default: "Main",
    },
    stats: {
      type: String,
      default: "",
    },
    themeColor: {
      type: String,
      default: "#2563eb",
    },
    image: {
      type: String,
      default: "",
    },
    chapters: [chapterSchema],
    status: {
      type: String,
      enum: ["Active", "Draft"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);