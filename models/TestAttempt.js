// const mongoose =
//   require("mongoose");

// const answerSchema =
//   new mongoose.Schema({

//     question: {
//       type:
//         mongoose.Schema.Types.ObjectId,

//       ref:
//         "Question",
//     },

//     selectedOption: {
//       type: String,
//       default: "",
//     },

//     correctAnswer: {
//       type: String,
//       default: "",
//     },

//     isCorrect: {
//       type: Boolean,
//       default: false,
//     },

//   });

// const testAttemptSchema =
//   new mongoose.Schema(

//     {

//       user: {
//         type:
//           mongoose.Schema.Types.ObjectId,

//         ref:
//           "User",

//         required: true,
//       },

//       test: {
//         type:
//           mongoose.Schema.Types.ObjectId,

//         ref:
//           "Test",

//         required: true,
//       },

//       answers:
//         [answerSchema],

//       totalQuestions: {
//         type: Number,
//         default: 0,
//       },

//       correctAnswers: {
//         type: Number,
//         default: 0,
//       },

//       wrongAnswers: {
//         type: Number,
//         default: 0,
//       },

//       score: {
//         type: Number,
//         default: 0,
//       },

//       percentage: {
//         type: Number,
//         default: 0,
//       },

//       submittedAt: {
//         type: Date,
//         default: Date.now,
//       },

//     },

//     {
//       timestamps: true,
//     }

//   );

// module.exports =
//   mongoose.model(
//     "TestAttempt",
//     testAttemptSchema
//   );


const mongoose =
  require("mongoose");

const answerSchema =
  new mongoose.Schema({

    question: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref:
        "Question",
    },

    // =========================
    // ANALYTICS
    // =========================

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

    // =========================
    // ANSWER DATA
    // =========================

    selectedOption: {
      type: String,
      default: "",
    },

    correctAnswer: {
      type: String,
      default: "",
    },

    isCorrect: {
      type: Boolean,
      default: false,
    },

    // =========================
    // MARKING
    // =========================

    marks: {
      type: Number,
      default: 0,
    },

    negativeMarks: {
      type: Number,
      default: 0,
    },

  });

const testAttemptSchema =
  new mongoose.Schema(

    {

      user: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "User",

        required: true,
      },

      test: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "Test",

        required: true,
      },

      answers:
        [answerSchema],

      totalQuestions: {
        type: Number,
        default: 0,
      },

      correctAnswers: {
        type: Number,
        default: 0,
      },

      wrongAnswers: {
        type: Number,
        default: 0,
      },

      score: {
        type: Number,
        default: 0,
      },

      percentage: {
        type: Number,
        default: 0,
      },

      submittedAt: {
        type: Date,
        default: Date.now,
      },

    },

    {
      timestamps: true,
    }

  );

module.exports =
  mongoose.model(
    "TestAttempt",
    testAttemptSchema
  );