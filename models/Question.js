const mongoose =
  require("mongoose");

const questionSchema =
  new mongoose.Schema(

    {

      // =====================================
      // ASSESSMENT
      // =====================================

      assessment_id: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "Assessment",

        required: false,

      },



      // =====================================
      // EXAM
      // =====================================

      exam_id: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "Exam",

      },



      // =====================================
      // SUBJECT
      // =====================================

      subject_id: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "Subject",

      },



      // =====================================
      // CHAPTER
      // =====================================

      chapter_id: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "Chapter",

      },



      // =====================================
      // TOPIC
      // =====================================

      topic_id: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "Topic",

      },



      // =====================================
      // QUESTION
      // =====================================

      question_text: {

        type: String,

        required: true,

      },



      question_image_url:
        String,



      // =====================================
      // OPTIONS
      // =====================================

      options: [

        {

          option: {

            type: String,

            enum: [

              "A",

              "B",

              "C",

              "D",

            ],

          },



          text:
            String,



          image_url:
            String,

        },

      ],



      // =====================================
      // CORRECT ANSWER
      // =====================================

      correct_answer: {

        type: String,

        required: true,

      },



      // =====================================
      // EXPLANATION
      // =====================================

      explanation: {

        type: String,

      },



      explanation_image_url:
        String,



      // =====================================
      // MARKS
      // =====================================

      marks: {

        type: Number,

        default: 4,

      },



      negative_marks: {

        type: Number,

        default: 1,

      },



      // =====================================
      // DIFFICULTY
      // =====================================

      difficulty: {

        type: String,

        enum: [

          "easy",

          "medium",

          "hard",

        ],

        default:
          "medium",

      },



      // =====================================
      // STATUS
      // =====================================

      is_deleted: {

        type: Boolean,

        default: false,

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

