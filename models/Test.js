
const mongoose =
  require("mongoose");

const testSchema =
  new mongoose.Schema(

    {

      // ======================
      // EXAM
      // ======================

      exam: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "Exam",

        required: true,

      },

      // ======================
      // TEACHER
      // ======================

      teacher: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "Teacher",

        required: true,

      },

      // ======================
      // CATEGORY
      // ======================

      category: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "Category",

        required: true,

      },

      // ======================
      // TEST DETAILS
      // ======================

      title: {

        type: String,

        required: true,

        trim: true,

      },

      subject: {

        type: String,

        default: "",

      },
       // ======================
 // TEST START DATE TIME
 // ======================

 startDateTime: {

   type: Date,

   required: true,

 },

 // ======================
 // TEST END DATE TIME
 // ======================

 endDateTime: {

   type: Date,

   required: true,

 },

      totalQuestions: {

        type: Number,

        default: 0,

      },

      duration: {

        type: Number,

        default: 180,

      },

      imagePath: {

        type: String,

        default: "",

      },

      // ======================
      // DYNAMIC INSTRUCTIONS
      // ======================

      instructions: [

        {

          type: String,

        },

      ],

      // ======================
      // STATUS
      // ======================

      status: {

        type: String,

        enum: [

          "Active",

          "Draft",

        ],

        default: "Active",

      },

    },

    {

      timestamps: true,

    }

  );

module.exports =
  mongoose.model(
    "Test",
    testSchema
  );