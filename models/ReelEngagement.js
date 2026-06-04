
// const mongoose =
//   require("mongoose");

// const reelEngagementSchema =
//   new mongoose.Schema(

//     {

//       // ======================================
//       // RELATIONS
//       // ======================================

//       reel_id: {

//         type:
//           mongoose.Schema.Types.ObjectId,

//         ref:
//           "Reel",

//         required: true,

//       },

//       user_id: {

//         type:
//           mongoose.Schema.Types.ObjectId,

//         ref:
//           "User",

//       },



//       // ======================================
//       // TYPE
//       // ======================================

//       type: {

//         type: String,

//         enum: [

//           "view",

//           "like",

//           "comment",

//           "share",

//           "save",

//         ],

//         required: true,

//       },



//       // ======================================
//       // COMMENT
//       // ======================================

//       comment_text: {

//         type: String,

//         default: "",

//       },



//       // ======================================
//       // WATCH TIME
//       // ======================================

//       watch_time: {

//         type: Number,

//         default: 0,

//       },



//       // ======================================
//       // STATUS
//       // ======================================

//       is_deleted: {

//         type: Boolean,

//         default: false,

//       },

//     },

//     {

//       timestamps: true,

//     }

//   );



// // ======================================
// // INDEXES
// // ======================================

// reelEngagementSchema.index({
//   reel_id: 1,
// });

// reelEngagementSchema.index({
//   user_id: 1,
// });

// reelEngagementSchema.index({
//   type: 1,
// });



// // ======================================
// // EXPORT
// // ======================================

// module.exports =
//   mongoose.model(

//     "ReelEngagement",

//     reelEngagementSchema

//   );



const mongoose =
  require("mongoose");

const reelEngagementSchema =
  new mongoose.Schema(

    {

      // ======================================
      // RELATIONS
      // ======================================

      reel_id: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "Reel",

        required: true,

      },

      user_id: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "User",

      },



      // ======================================
      // TYPE
      // ======================================

      type: {

        type: String,

        enum: [

          "view",

          "like",

          "comment",

          "share",

          "save",
          "download",

        ],

        required: true,

      },



      // ======================================
      // COMMENT
      // ======================================

      comment_text: {

        type: String,

        default: "",

      },



      // ======================================
      // WATCH TIME
      // ======================================

      watch_time: {

        type: Number,

        default: 0,

      },



      // ======================================
      // STATUS
      // ======================================

      is_deleted: {

        type: Boolean,

        default: false,

      },

    },

    {

      timestamps: true,

    }

  );



// ======================================
// INDEXES
// ======================================

reelEngagementSchema.index({
  reel_id: 1,
});

reelEngagementSchema.index({
  user_id: 1,
});

reelEngagementSchema.index({
  type: 1,
});



// ======================================
// EXPORT
// ======================================

module.exports =
  mongoose.model(

    "ReelEngagement",

    reelEngagementSchema

  );

