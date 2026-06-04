// const express = require("express");
// const router = express.Router();

// const {
//   createTopic,
//   getTopicsByChapter,
// } = require("../controllers/topicController");

// router.post("/create", createTopic);

// router.get("/chapter/:chapterId", getTopicsByChapter);

// module.exports = router;

const express =
  require("express");

const router =
  express.Router();

const {

  createTopic,
  getTopicsByChapter,
  getSingleTopic,
  updateTopic,
  deleteTopic,

} = require(
  "../controllers/topicController"
);



// CREATE

router.post(
  "/create",
  createTopic
);



// GET BY CHAPTER

router.get(
  "/chapter/:chapterId",
  getTopicsByChapter
);



// GET SINGLE

router.get(
  "/:id",
  getSingleTopic
);



// UPDATE

router.put(
  "/:id",
  updateTopic
);



// DELETE

router.delete(
  "/:id",
  deleteTopic
);

module.exports =
  router;