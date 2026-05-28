// const mongoose = require("mongoose");

// // ===============================
// // QUESTION SCHEMA
// // ===============================

// const questionSchema = new mongoose.Schema(

//   {

//     test: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Test",
//       required: true,
//     },

//     question: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     options: [

//       {
//         type: String,
//         required: true,
//       },

//     ],

//     correctAnswer: {
//       type: String,
//       required: true,
//     },

//     explanation: {
//       type: String,
//       default: "",
//     },

//     marks: {
//       type: Number,
//       default: 4,
//     },

//     negativeMarks: {
//       type: Number,
//       default: 1,
//     },

//     subject: {
//       type: String,
//       default: "",
//     },

//   },

//   { timestamps: true }

// );

// module.exports =
//   mongoose.model(
//     "Question",
//     questionSchema
//   );


const mongoose = require("mongoose");

// ===============================
// QUESTION SCHEMA
// ===============================

const questionSchema =
  new mongoose.Schema(

    {

      test: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "Test",

        required: true,
      },

      question: {
        type: String,
        required: true,
        trim: true,
      },

      options: [

        {
          type: String,
          required: true,
        },

      ],

      correctAnswer: {
        type: String,
        required: true,
      },

      explanation: {
        type: String,
        default: "",
      },

      marks: {
        type: Number,
        default: 4,
      },

      negativeMarks: {
        type: Number,
        default: 1,
      },

      // ===========================
      // ANALYTICS FIELDS
      // ===========================

      subject: {
        type: String,
        default: "",
      },

      chapter: {
        type: String,
        default: "",
      },

      topic: {
        type: String,
        default: "",
      },

    },

    {
      timestamps: true,
    }

  );

module.exports =
  mongoose.model(
    "Question",
    questionSchema
  );