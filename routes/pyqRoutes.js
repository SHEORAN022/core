// const express =
//   require("express");

// const router =
//   express.Router();

// const upload =
//   require("../middleware/upload");

// const {

//   createPyq,

//   getPyqs,

// } = require(

//   "../controllers/pyqController"

// );

// // =======================
// // CREATE PYQ
// // =======================

// router.post(

//   "/create",

//   upload.fields([

//     {

//       name: "video",

//       maxCount: 1,

//     },

//     {

//       name: "thumbnail",

//       maxCount: 1,

//     },

//   ]),

//   createPyq

// );

// // =======================
// // GET PYQS
// // =======================

// router.get(

//   "/",

//   getPyqs

// );

// module.exports =
//   router;



const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  createPyq,
  getPyqs,
  getSinglePyq,  // ← ADD
  updatePyq,     // ← ADD
  deletePyq,     // ← ADD
} = require("../controllers/pyqController");


router.post(
  "/create",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  createPyq
);

router.get("/", getPyqs);


router.get("/:id", getSinglePyq);

router.put(
  "/:id",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  updatePyq
);


router.delete("/:id", deletePyq);

module.exports = router;