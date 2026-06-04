// const mongoose = require("mongoose");

// const adminSchema = new mongoose.Schema(
//   {
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       lowercase: true,
//     },

//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Admin", adminSchema);


const mongoose =
  require("mongoose");

const adminSchema =
  new mongoose.Schema(

    {

      // ======================================
      // NAME
      // ======================================

      name: {

        type: String,

        default: "",

        trim: true,

      },



      // ======================================
      // EMAIL
      // ======================================

      email: {

        type: String,

        required: true,

        unique: true,

        trim: true,

        lowercase: true,

      },



      // ======================================
      // PASSWORD
      // ======================================

      password: {

        type: String,

        required: true,

        minlength: 6,

      },



      // ======================================
      // ROLE
      // ======================================

      role: {

        type: String,

        enum: [

          "admin",

          "content_studio",

        ],

        default:
          "content_studio",

      },



      // ======================================
      // STATUS
      // ======================================

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

adminSchema.index({

  email: 1,

});



// ======================================
// EXPORT
// ======================================

module.exports =

  mongoose.models.Admin ||

  mongoose.model(

    "Admin",

    adminSchema

  );

