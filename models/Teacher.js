// const mongoose =
//   require("mongoose");

// const teacherSchema =
//   new mongoose.Schema(

//     {

//       // ======================
//       // BASIC DETAILS
//       // ======================

//       teacherName: {
//         type: String,
//         required: true,
//         trim: true,
//       },

//       email: {
//         type: String,
//         default: "",
//       },

//       phone: {
//         type: String,
//         default: "",
//       },

//       profileImage: {
//         type: String,
//         default: "",
//       },

//       // ======================
//       // PROFESSIONAL DETAILS
//       // ======================

//       qualification: {
//         type: String,
//         default: "",
//       },

//       experience: {
//         type: Number,
//         default: 0,
//       },

//       description: {
//         type: String,
//         default: "",
//       },

//       // ======================
//       // SUBJECTS
//       // ======================

//       subjects: [

//         {
//           type: String,
//         },

//       ],

//       // ======================
//       // STATUS
//       // ======================

//       status: {
//         type: String,

//         enum: [
//           "Active",
//           "Inactive",
//         ],

//         default: "Active",
//       },

//     },

//     {
//       timestamps: true,
//     }

//   );

// module.exports =
//   mongoose.model(
//     "Teacher",
//     teacherSchema
//   );


const mongoose =
  require("mongoose");

const teacherSchema =
  new mongoose.Schema(

    {

      // ======================
      // BASIC DETAILS
      // ======================

      teacherName: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        default: "",
        trim: true,
      },

      phone: {
        type: String,
        default: "",
        trim: true,
      },

      profileImage: {
        type: String,
        default: "",
      },

      // ======================
      // PROFESSIONAL DETAILS
      // ======================

      qualification: {
        type: String,
        default: "",
        trim: true,
      },

      experience: {
        type: Number,
        default: 0,
      },

      description: {
        type: String,
        default: "",
        trim: true,
      },

      // ======================
      // SUBJECTS
      // ======================

      subjects: [

        {
          type: String,
          trim: true,
        },

      ],

      // ======================
      // STATUS
      // ======================

      status: {
        type: String,

        enum: [
          "Active",
          "Inactive",
        ],

        default: "Active",
      },

    },

    {
      timestamps: true,

      toJSON: {
        virtuals: true,
      },

      toObject: {
        virtuals: true,
      },

    }

  );

// ======================
// VIRTUAL REELS
// ======================

teacherSchema.virtual(
  "reels",
  {

    ref: "Reel",

    localField: "_id",

    foreignField: "teacher",

  }
);

// ======================
// EXPORT MODEL
// ======================

module.exports =
  mongoose.model(
    "Teacher",
    teacherSchema
  );