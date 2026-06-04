
// const express =
//   require("express");

// const router =
//   express.Router();

// const userAuth =
//   require(
//     "../middleware/userAuth"
//   );

// // const {

// //   addView,

// //   toggleLike,

// //   addComment,

// //   toggleSave,

// //   addShare,

// //   fetchComments,

// //   fetchReelStats,

// // } = require(

// //   "../controllers/reelEngagementController"

// // );

// const {
//   addView,
//   likeReel,
//   unlikeReel,
//   addComment,
//   toggleSave,
//   addShare,
//   fetchComments,
//   fetchReelStats,
// } = require("../controllers/reelEngagementController");



// // ======================================
// // ADD VIEW
// // ======================================

// router.post(

//   "/view/:reelId",

//   userAuth,

//   addView

// );



// // ======================================
// // LIKE / UNLIKE
// // ======================================

// // router.post(

// //   "/like/:reelId",

// //   userAuth,

// //   toggleLike

// // );

// // LIKE
// router.post(
//   "/like/:reelId",
//   userAuth,
//   likeReel
// );

// // UNLIKE
// router.delete(
//   "/unlike/:reelId",
//   userAuth,
//   unlikeReel
// );


// // ======================================
// // COMMENT
// // ======================================

// router.post(

//   "/comment/:reelId",

//   userAuth,

//   addComment

// );



// // ======================================
// // SAVE / UNSAVE
// // ======================================

// router.post(

//   "/save/:reelId",

//   userAuth,

//   toggleSave

// );



// // ======================================
// // SHARE
// // ======================================

// router.post(

//   "/share/:reelId",

//   userAuth,

//   addShare

// );



// // ======================================
// // GET COMMENTS
// // ======================================

// router.get(

//   "/comments/:reelId",

//   fetchComments

// );



// // ======================================
// // GET REEL STATS
// // ======================================

// router.get(

//   "/stats/:reelId",

//   fetchReelStats

// );



// // ======================================
// // EXPORT
// // ======================================

// module.exports =
//   router;


const express =
  require("express");

const router =
  express.Router();

const userAuth =
  require(
    "../middleware/userAuth"
  );

// const {

//   addView,

//   toggleLike,

//   addComment,

//   toggleSave,

//   addShare,

//   fetchComments,

//   fetchReelStats,

// } = require(

//   "../controllers/reelEngagementController"

// );

const {
  addView,
  likeReel,
  unlikeReel,
  addComment,
  toggleSave,
  addShare,
  fetchComments,
  fetchReelStats,
    downloadReel,
} = require("../controllers/reelEngagementController");



// ======================================
// ADD VIEW
// ======================================

router.post(

  "/view/:reelId",

  userAuth,

  addView

);
router.get(
  "/download/:reelId",
  userAuth,
  downloadReel
);



// ======================================
// LIKE / UNLIKE
// ======================================

// router.post(

//   "/like/:reelId",

//   userAuth,

//   toggleLike

// );

// LIKE
router.post(
  "/like/:reelId",
  userAuth,
  likeReel
);

// UNLIKE
router.delete(
  "/unlike/:reelId",
  userAuth,
  unlikeReel
);


// ======================================
// COMMENT
// ======================================

router.post(

  "/comment/:reelId",

  userAuth,

  addComment

);



// ======================================
// SAVE / UNSAVE
// ======================================

router.post(

  "/save/:reelId",

  userAuth,

  toggleSave

);



// ======================================
// SHARE
// ======================================

router.post(

  "/share/:reelId",

  userAuth,

  addShare

);



// ======================================
// GET COMMENTS
// ======================================

router.get(

  "/comments/:reelId",

  fetchComments

);



// ======================================
// GET REEL STATS
// ======================================

router.get(

  "/stats/:reelId",

  fetchReelStats

);



// ======================================
// EXPORT
// ======================================

module.exports =
  router;


