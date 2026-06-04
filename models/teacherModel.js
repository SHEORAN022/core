// const mongoose = require("mongoose");

// const teacherSchema = new mongoose.Schema(
//   {
//    teacherName: {
//   type: String,
//   required: true,
//   trim: true,
// },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     subject: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );

// module.exports =
//   mongoose.models.Teacher ||
//   mongoose.model(
//     "Teacher",
//     teacherSchema
//   );


const mongoose =
  require("mongoose");

const teacherSchema =
  new mongoose.Schema(

    {

      // ======================================
      // BASIC INFO
      // ======================================

      teacherName: {

        type: String,

        required: true,

        trim: true,

      },

      email: {

        type: String,

        required: true,

        unique: true,

        lowercase: true,

        trim: true,

      },



      // ======================================
      // SUBJECTS
      // ======================================

      subjects: [

        {

          type:
            mongoose.Schema.Types.ObjectId,

          ref:
            "Subject",

        },

      ],



      // ======================================
      // EXTRA
      // ======================================

      bio: {

        type: String,

        default: "",

      },

      profile_image: {

        type: String,

        default: "",

      },

      experience: {

        type: Number,

        default: 0,

      },

      qualification: {

        type: String,

        default: "",

      },

      is_active: {

        type: Boolean,

        default: true,

      },

    },

    {

      timestamps: true,

    }

  );



// ======================================
// INDEXES
// ======================================

teacherSchema.index({
  teacherName: 1,
});

// teacherSchema.index({
//   email: 1,
// });



// ======================================
// EXPORT
// ======================================

module.exports =

  mongoose.models.Teacher ||

  mongoose.model(

    "Teacher",

    teacherSchema

  );

