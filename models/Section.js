// const mongoose =
//   require("mongoose");

// const sectionSchema =
//   new mongoose.Schema(

//     {

//       // ======================
//       // EXAM
//       // ======================

//       exam: {

//         type:
//           mongoose.Schema.Types.ObjectId,

//         ref: "Exam",

//         required: true,

//       },

//       // ======================
//       // SECTION TITLE
//       // ======================

//       title: {

//         type: String,

//         required: true,

//         trim: true,

//       },

//       // ======================
//       // SECTION TYPE
//       // ======================

//       type: {

//         type: String,

//         enum: [

//           "subject",

//           "recommended",

//           "trending",

//           "banner",

//         ],

//         default:
//           "subject",

//       },

//       // ======================
//       // SECTION SUBTITLE
//       // ======================

//       subtitle: {

//         type: String,

//         default: "",

//       },

//       // ======================
//       // SUBJECTS
//       // ======================

//       subjects: [

//         {

//           type:
//             mongoose.Schema.Types.ObjectId,

//           ref: "Subject",

//         },

//       ],

//       // ======================
//       // POSITION
//       // ======================

//       position: {

//         type: Number,

//         default: 1,

//       },

//       // ======================
//       // GRID COLUMNS
//       // ======================

//       columns: {

//         type: Number,

//         default: 2,

//       },

//       // ======================
//       // HORIZONTAL SCROLL
//       // ======================

//       isHorizontal: {

//         type: Boolean,

//         default: false,

//       },

//       // ======================
//       // SHOW VIEW ALL BUTTON
//       // ======================

//       showViewAll: {

//         type: Boolean,

//         default: true,

//       },

//       // ======================
//       // SECTION BANNER IMAGE
//       // ======================

//       bannerImage: {

//         type: String,

//         default: "",

//       },

//       // ======================
//       // ACTIVE STATUS
//       // ======================

//       isActive: {

//         type: Boolean,

//         default: true,

//       },

//     },

//     {
//       timestamps: true,
//     }

//   );

// module.exports =
//   mongoose.model(
//     "Section",
//     sectionSchema
//   );


const mongoose =
  require("mongoose");

const sectionSchema =
  new mongoose.Schema(

    {

      // ======================
      // EXAM
      // ======================

      exam: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Exam",

        required: true,

      },

      // ======================
      // SECTION TITLE
      // ======================

      title: {

        type: String,

        required: true,

        trim: true,

      },

      // ======================
      // SECTION TYPE
      // ======================

      type: {

        type: String,

        enum: [

          "subject",

          "recommended",

          "trending",

          "banner",

        ],

        default:
          "subject",

      },

      // ======================
      // SECTION SUBTITLE
      // ======================

      subtitle: {

        type: String,

        default: "",

      },

      // ======================
      // SUBJECTS
      // ======================

      subjects: [

        {

          type:
            mongoose.Schema.Types.ObjectId,

          ref: "Subject",

        },

      ],

      // ======================
      // POSITION
      // ======================

      position: {

        type: Number,

        default: 1,

      },

      // ======================
      // GRID COLUMNS
      // ======================

      columns: {

        type: Number,

        default: 2,

      },

      // ======================
      // HORIZONTAL SCROLL
      // ======================

      isHorizontal: {

        type: Boolean,

        default: false,

      },

      // ======================
      // SHOW VIEW ALL BUTTON
      // ======================

      showViewAll: {

        type: Boolean,

        default: true,

      },

      // ======================
      // SECTION BANNER IMAGE
      // ======================

      bannerImage: {

        type: String,

        default: "",

      },

      // ======================
      // ACTIVE STATUS
      // ======================

      isActive: {

        type: Boolean,

        default: true,

      },

    },

    {
      timestamps: true,
    }

  );

module.exports =
  mongoose.model(
    "Section",
    sectionSchema
  );