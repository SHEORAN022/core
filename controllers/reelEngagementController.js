
// const Reel =
//   require("../models/Reel");

// const ReelEngagement =
//   require(
//     "../models/ReelEngagement"
//   );



// // ======================================
// // ADD VIEW
// // ======================================

// // exports.addView =
// //   async (req, res) => {

// //     try {

// //       const reel_id =
// //         req.params.reelId;

// //       const user_id =
// //         req.user?._id || null;



// //       // CREATE VIEW

// //       await ReelEngagement.create({

// //         reel_id,

// //         user_id,

// //         type: "view",

// //       });



// //       // UPDATE COUNT

// //       await Reel.findByIdAndUpdate(

// //         reel_id,

// //         {

// //           $inc: {

// //             total_views: 1,

// //           },

// //         }

// //       );



// //       res.status(200).json({

// //         success: true,

// //         message:
// //           "View added",

// //       });

// //     } catch (error) {

// //       console.log(error);



// //       res.status(500).json({

// //         success: false,

// //         message:
// //           error.message,

// //       });

// //     }

// //   };



// // ======================================
// // ADD VIEW
// // ======================================

// exports.addView =
//   async (req, res) => {

//     try {

//       const reel_id =
//         req.params.reelId;

//       const user_id =
//         req.user?._id || null;



//       // ======================================
//       // CHECK REEL
//       // ======================================

//       const reel =
//         await Reel.findById(
//           reel_id
//         );

//       if (!reel) {

//         return res.status(404).json({

//           success: false,

//           message:
//             "Reel not found",

//         });

//       }



//       // ======================================
//       // CHECK EXISTING VIEW
//       // ======================================

//       const existingView =
//         await ReelEngagement.findOne({

//           reel_id,

//           user_id,

//           type: "view",

//         });



//       // ======================================
//       // ALREADY VIEWED
//       // ======================================

//       if (existingView) {

//         return res.status(200).json({

//           success: true,

//           message:
//             "Already viewed",

//           total_views:
//             reel.total_views,

//         });

//       }



//       // ======================================
//       // CREATE VIEW
//       // ======================================

//       await ReelEngagement.create({

//         reel_id,

//         user_id,

//         type: "view",

//       });



//       // ======================================
//       // UPDATE COUNT
//       // ======================================

//       const updatedReel =
//         await Reel.findByIdAndUpdate(

//           reel_id,

//           {

//             $inc: {

//               total_views: 1,

//             },

//           },

//           {

//             returnDocument:
//               "after",

//           }

//         );



//       // ======================================
//       // RESPONSE
//       // ======================================

//       res.status(200).json({

//         success: true,

//         message:
//           "View added",

//         total_views:
//           updatedReel.total_views,

//       });

//     } catch (error) {

//       console.log(error);



//       res.status(500).json({

//         success: false,

//         message:
//           error.message,

//       });

//     }

//   };






// // exports.toggleLike =
// //   async (req, res) => {

// //     try {

// //       const reel_id =
// //         req.params.reelId;

// //       const user_id =
// //         req.user._id;



// //       const existing =
// //         await ReelEngagement.findOne({

// //           reel_id,

// //           user_id,

// //           type: "like",

// //           is_deleted: false,

// //         });



// //       // ======================================
// //       // UNLIKE
// //       // ======================================

// //       if (existing) {

// //         existing.is_deleted =
// //           true;

// //         await existing.save();



// //         await Reel.findByIdAndUpdate(

// //           reel_id,

// //           {

// //             $inc: {

// //               total_likes: -1,

// //             },

// //           }

// //         );



// //         return res.status(200).json({

// //           success: true,

// //           liked: false,

// //           message:
// //             "Reel unliked",

// //         });

// //       }



// //       // ======================================
// //       // LIKE
// //       // ======================================

// //       await ReelEngagement.create({

// //         reel_id,

// //         user_id,

// //         type: "like",

// //       });



// //       await Reel.findByIdAndUpdate(

// //         reel_id,

// //         {

// //           $inc: {

// //             total_likes: 1,

// //           },

// //         }

// //       );



// //       res.status(201).json({

// //         success: true,

// //         liked: true,

// //         message:
// //           "Reel liked",

// //       });

// //     } catch (error) {

// //       console.log(error);



// //       res.status(500).json({

// //         success: false,

// //         message:
// //           error.message,

// //       });

// //     }

// //   };

// exports.likeReel = async (req, res) => {
//   try {
//     const reel_id = req.params.reelId;
//     const user_id = req.user._id;

//     const existingLike = await ReelEngagement.findOne({
//       reel_id,
//       user_id,
//       type: "like",
//       is_deleted: false,
//     });

//     if (existingLike) {
//       return res.status(400).json({
//         success: false,
//         message: "Already liked",
//       });
//     }

//     await ReelEngagement.create({
//       reel_id,
//       user_id,
//       type: "like",
//     });

//     await Reel.findByIdAndUpdate(reel_id, {
//       $inc: {
//         total_likes: 1,
//       },
//     });

//     res.status(200).json({
//       success: true,
//       message: "Reel liked successfully",
//     });

//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// exports.unlikeReel = async (req, res) => {
//   try {
//     const reel_id = req.params.reelId;
//     const user_id = req.user._id;

//     const like = await ReelEngagement.findOne({
//       reel_id,
//       user_id,
//       type: "like",
//       is_deleted: false,
//     });

//     if (!like) {
//       return res.status(404).json({
//         success: false,
//         message: "Like not found",
//       });
//     }

//     like.is_deleted = true;
//     await like.save();

//     await Reel.findByIdAndUpdate(reel_id, {
//       $inc: {
//         total_likes: -1,
//       },
//     });

//     res.status(200).json({
//       success: true,
//       message: "Reel unliked successfully",
//     });

//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// // ======================================
// // ADD COMMENT
// // ======================================

// exports.addComment =
//   async (req, res) => {

//     try {

//       const reel_id =
//         req.params.reelId;

//       const user_id =
//         req.user._id;

//       const {
//         comment_text,
//       } = req.body;



//       // VALIDATION

//       if (!comment_text) {

//         return res.status(400).json({

//           success: false,

//           message:
//             "Comment required",

//         });

//       }



//       // CREATE COMMENT

//       const comment =
//         await ReelEngagement.create({

//           reel_id,

//           user_id,

//           type: "comment",

//           comment_text,

//         });



//       // UPDATE COUNT

//       await Reel.findByIdAndUpdate(

//         reel_id,

//         {

//           $inc: {

//             total_comments: 1,

//           },

//         }

//       );



//       res.status(201).json({

//         success: true,

//         message:
//           "Comment added",

//         comment,

//       });

//     } catch (error) {

//       console.log(error);



//       res.status(500).json({

//         success: false,

//         message:
//           error.message,

//       });

//     }

//   };



// // ======================================
// // SAVE REEL
// // ======================================

// exports.toggleSave =
//   async (req, res) => {

//     try {

//       const reel_id =
//         req.params.reelId;

//       const user_id =
//         req.user._id;



//       const existing =
//         await ReelEngagement.findOne({

//           reel_id,

//           user_id,

//           type: "save",

//           is_deleted: false,

//         });



//       // REMOVE SAVE

//       if (existing) {

//         existing.is_deleted =
//           true;

//         await existing.save();



//         await Reel.findByIdAndUpdate(

//           reel_id,

//           {

//             $inc: {

//               total_saves: -1,

//             },

//           }

//         );



//         return res.status(200).json({

//           success: true,

//           saved: false,

//           message:
//             "Removed from saved",

//         });

//       }



//       // SAVE

//       await ReelEngagement.create({

//         reel_id,

//         user_id,

//         type: "save",

//       });



//       await Reel.findByIdAndUpdate(

//         reel_id,

//         {

//           $inc: {

//             total_saves: 1,

//           },

//         }

//       );



//       res.status(201).json({

//         success: true,

//         saved: true,

//         message:
//           "Reel saved",

//       });

//     } catch (error) {

//       console.log(error);



//       res.status(500).json({

//         success: false,

//         message:
//           error.message,

//       });

//     }

//   };



// // ======================================
// // SHARE REEL
// // ======================================

// exports.addShare =
//   async (req, res) => {

//     try {

//       const reel_id =
//         req.params.reelId;

//       const user_id =
//         req.user?._id || null;



//       // CREATE SHARE

//       await ReelEngagement.create({

//         reel_id,

//         user_id,

//         type: "share",

//       });



//       // UPDATE COUNT

//       await Reel.findByIdAndUpdate(

//         reel_id,

//         {

//           $inc: {

//             total_shares: 1,

//           },

//         }

//       );



//       res.status(200).json({

//         success: true,

//         message:
//           "Reel shared",

//       });

//     } catch (error) {

//       console.log(error);



//       res.status(500).json({

//         success: false,

//         message:
//           error.message,

//       });

//     }

//   };



// // ======================================
// // GET COMMENTS
// // ======================================

// exports.fetchComments =
//   async (req, res) => {

//     try {

//       const comments =
//         await ReelEngagement.find({

//           reel_id:
//             req.params.reelId,

//           type: "comment",

//           is_deleted: false,

//         })

//         .populate(

//           "user_id",

//           "name profile_image"

//         )

//         .sort({

//           createdAt: -1,

//         });



//       res.status(200).json({

//         success: true,



//         count:
//           comments.length,



//         comments,

//       });

//     } catch (error) {

//       console.log(error);



//       res.status(500).json({

//         success: false,



//         message:
//           error.message,

//       });

//     }

//   };



// // ======================================
// // GET REEL STATS
// // ======================================

// exports.fetchReelStats =
//   async (req, res) => {

//     try {

//       const reel =
//         await Reel.findById(

//           req.params.reelId

//         );



//       if (!reel) {

//         return res.status(404).json({

//           success: false,

//           message:
//             "Reel not found",

//         });

//       }



//       res.status(200).json({

//         success: true,



//         stats: {

//           views:
//             reel.total_views,



//           likes:
//             reel.total_likes,



//           comments:
//             reel.total_comments,



//           shares:
//             reel.total_shares,



//           saves:
//             reel.total_saves,

//         },

//       });

//     } catch (error) {

//       console.log(error);



//       res.status(500).json({

//         success: false,



//         message:
//           error.message,

//       });

//     }

//   };


const Reel =
  require("../models/Reel");

const ReelEngagement =
  require(
    "../models/ReelEngagement"
  );



// ======================================
// ADD VIEW
// ======================================

// exports.addView =
//   async (req, res) => {

//     try {

//       const reel_id =
//         req.params.reelId;

//       const user_id =
//         req.user?._id || null;



//       // CREATE VIEW

//       await ReelEngagement.create({

//         reel_id,

//         user_id,

//         type: "view",

//       });



//       // UPDATE COUNT

//       await Reel.findByIdAndUpdate(

//         reel_id,

//         {

//           $inc: {

//             total_views: 1,

//           },

//         }

//       );



//       res.status(200).json({

//         success: true,

//         message:
//           "View added",

//       });

//     } catch (error) {

//       console.log(error);



//       res.status(500).json({

//         success: false,

//         message:
//           error.message,

//       });

//     }

//   };



// ======================================
// ADD VIEW
// ======================================

exports.addView =
  async (req, res) => {

    try {

      const reel_id =
        req.params.reelId;

      const user_id =
        req.user?._id || null;



      // ======================================
      // CHECK REEL
      // ======================================

      const reel =
        await Reel.findById(
          reel_id
        );

      if (!reel) {

        return res.status(404).json({

          success: false,

          message:
            "Reel not found",

        });

      }



      // ======================================
      // CHECK EXISTING VIEW
      // ======================================

      const existingView =
        await ReelEngagement.findOne({

          reel_id,

          user_id,

          type: "view",

        });



      // ======================================
      // ALREADY VIEWED
      // ======================================

      if (existingView) {

        return res.status(200).json({

          success: true,

          message:
            "Already viewed",

          total_views:
            reel.total_views,

        });

      }



      // ======================================
      // CREATE VIEW
      // ======================================

      await ReelEngagement.create({

        reel_id,

        user_id,

        type: "view",

      });



      // ======================================
      // UPDATE COUNT
      // ======================================

      const updatedReel =
        await Reel.findByIdAndUpdate(

          reel_id,

          {

            $inc: {

              total_views: 1,

            },

          },

          {

            returnDocument:
              "after",

          }

        );



      // ======================================
      // RESPONSE
      // ======================================

      res.status(200).json({

        success: true,

        message:
          "View added",

        total_views:
          updatedReel.total_views,

      });

    } catch (error) {

      console.log(error);



      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };






// exports.toggleLike =
//   async (req, res) => {

//     try {

//       const reel_id =
//         req.params.reelId;

//       const user_id =
//         req.user._id;



//       const existing =
//         await ReelEngagement.findOne({

//           reel_id,

//           user_id,

//           type: "like",

//           is_deleted: false,

//         });



//       // ======================================
//       // UNLIKE
//       // ======================================

//       if (existing) {

//         existing.is_deleted =
//           true;

//         await existing.save();



//         await Reel.findByIdAndUpdate(

//           reel_id,

//           {

//             $inc: {

//               total_likes: -1,

//             },

//           }

//         );



//         return res.status(200).json({

//           success: true,

//           liked: false,

//           message:
//             "Reel unliked",

//         });

//       }



//       // ======================================
//       // LIKE
//       // ======================================

//       await ReelEngagement.create({

//         reel_id,

//         user_id,

//         type: "like",

//       });



//       await Reel.findByIdAndUpdate(

//         reel_id,

//         {

//           $inc: {

//             total_likes: 1,

//           },

//         }

//       );



//       res.status(201).json({

//         success: true,

//         liked: true,

//         message:
//           "Reel liked",

//       });

//     } catch (error) {

//       console.log(error);



//       res.status(500).json({

//         success: false,

//         message:
//           error.message,

//       });

//     }

//   };

exports.likeReel = async (req, res) => {
  try {
    const reel_id = req.params.reelId;
    const user_id = req.user._id;

    const existingLike = await ReelEngagement.findOne({
      reel_id,
      user_id,
      type: "like",
      is_deleted: false,
    });

    if (existingLike) {
      return res.status(400).json({
        success: false,
        message: "Already liked",
      });
    }

    await ReelEngagement.create({
      reel_id,
      user_id,
      type: "like",
    });

    await Reel.findByIdAndUpdate(reel_id, {
      $inc: {
        total_likes: 1,
      },
    });

    res.status(200).json({
      success: true,
      message: "Reel liked successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.unlikeReel = async (req, res) => {
  try {
    const reel_id = req.params.reelId;
    const user_id = req.user._id;

    const like = await ReelEngagement.findOne({
      reel_id,
      user_id,
      type: "like",
      is_deleted: false,
    });

    if (!like) {
      return res.status(404).json({
        success: false,
        message: "Like not found",
      });
    }

    like.is_deleted = true;
    await like.save();

    await Reel.findByIdAndUpdate(reel_id, {
      $inc: {
        total_likes: -1,
      },
    });

    res.status(200).json({
      success: true,
      message: "Reel unliked successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ======================================
// ADD COMMENT
// ======================================

exports.addComment =
  async (req, res) => {

    try {

      const reel_id =
        req.params.reelId;

      const user_id =
        req.user._id;

      const {
        comment_text,
      } = req.body;



      // VALIDATION

      if (!comment_text) {

        return res.status(400).json({

          success: false,

          message:
            "Comment required",

        });

      }



      // CREATE COMMENT

      const comment =
        await ReelEngagement.create({

          reel_id,

          user_id,

          type: "comment",

          comment_text,

        });



      // UPDATE COUNT

      await Reel.findByIdAndUpdate(

        reel_id,

        {

          $inc: {

            total_comments: 1,

          },

        }

      );



      res.status(201).json({

        success: true,

        message:
          "Comment added",

        comment,

      });

    } catch (error) {

      console.log(error);



      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };



// ======================================
// SAVE REEL
// ======================================

exports.toggleSave =
  async (req, res) => {

    try {

      const reel_id =
        req.params.reelId;

      const user_id =
        req.user._id;



      const existing =
        await ReelEngagement.findOne({

          reel_id,

          user_id,

          type: "save",

          is_deleted: false,

        });



      // REMOVE SAVE

      if (existing) {

        existing.is_deleted =
          true;

        await existing.save();



        await Reel.findByIdAndUpdate(

          reel_id,

          {

            $inc: {

              total_saves: -1,

            },

          }

        );



        return res.status(200).json({

          success: true,

          saved: false,

          message:
            "Removed from saved",

        });

      }



      // SAVE

      await ReelEngagement.create({

        reel_id,

        user_id,

        type: "save",

      });



      await Reel.findByIdAndUpdate(

        reel_id,

        {

          $inc: {

            total_saves: 1,

          },

        }

      );



      res.status(201).json({

        success: true,

        saved: true,

        message:
          "Reel saved",

      });

    } catch (error) {

      console.log(error);



      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };



// ======================================
// SHARE REEL
// ======================================

exports.addShare =
  async (req, res) => {

    try {

      const reel_id =
        req.params.reelId;

      const user_id =
        req.user?._id || null;



      // CREATE SHARE

      await ReelEngagement.create({

        reel_id,

        user_id,

        type: "share",

      });



      // UPDATE COUNT

      await Reel.findByIdAndUpdate(

        reel_id,

        {

          $inc: {

            total_shares: 1,

          },

        }

      );



      res.status(200).json({

        success: true,

        message:
          "Reel shared",

      });

    } catch (error) {

      console.log(error);



      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };



// ======================================
// GET COMMENTS
// ======================================

exports.fetchComments =
  async (req, res) => {

    try {

      const comments =
        await ReelEngagement.find({

          reel_id:
            req.params.reelId,

          type: "comment",

          is_deleted: false,

        })

        .populate(

          "user_id",

          "name profile_image"

        )

        .sort({

          createdAt: -1,

        });



      res.status(200).json({

        success: true,



        count:
          comments.length,



        comments,

      });

    } catch (error) {

      console.log(error);



      res.status(500).json({

        success: false,



        message:
          error.message,

      });

    }

  };



// ======================================
// GET REEL STATS
// ======================================

exports.fetchReelStats =
  async (req, res) => {

    try {

      const reel =
        await Reel.findById(

          req.params.reelId

        );



      if (!reel) {

        return res.status(404).json({

          success: false,

          message:
            "Reel not found",

        });

      }



      res.status(200).json({

        success: true,



        stats: {

          views:
            reel.total_views,



          likes:
            reel.total_likes,



          comments:
            reel.total_comments,



          shares:
            reel.total_shares,



          saves:
            reel.total_saves,

        },

      });

    } catch (error) {

      console.log(error);



      res.status(500).json({

        success: false,



        message:
          error.message,

      });

    }

  };
exports.downloadReel = async (req, res) => {
  try {
    const reel_id = req.params.reelId;
    const user_id = req.user?._id || null;

    // ======================================
    // CHECK REEL
    // ======================================

    const reel = await Reel.findById(reel_id);

    if (!reel) {
      return res.status(404).json({
        success: false,
        message: "Reel not found",
      });
    }

    // ======================================
    // SAVE DOWNLOAD ENGAGEMENT
    // ======================================

    await ReelEngagement.create({
      reel_id,
      user_id,
      type: "download",
    });

    // ======================================
    // UPDATE DOWNLOAD COUNT
    // ======================================

    await Reel.findByIdAndUpdate(
      reel_id,
      {
        $inc: {
          total_downloads: 1,
        },
      }
    );

    // ======================================
    // GET DOWNLOAD URL
    // ======================================

    const downloadUrl =
      reel.video_url ||
      reel.source_video_url ||
      reel.hls_master_url ||
      "";

    // ======================================
    // RESPONSE
    // ======================================

    res.status(200).json({
      success: true,
      message: "Download tracked successfully",
      reel_id: reel._id,
      title: reel.title,
      download_url: downloadUrl,
      total_downloads:
        (reel.total_downloads || 0) + 1,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
