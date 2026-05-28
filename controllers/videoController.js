const Video = require("../models/Video");
const Subject = require("../models/Subject");
const uploadToBunny = require("../utils/uploadToBunny");

// =================================
// CREATE VIDEO
// =================================

exports.createVideo = async (req, res) => {
  try {
    const {
      subject,
      chapter,
      topic,
      title,
      description,
      videoLink,
      status,
    } = req.body;

    // =====================
    // VALIDATION
    // =====================

    if (!subject) {
      return res.status(400).json({
        success: false,
        message: "Subject is required",
      });
    }

    if (!chapter) {
      return res.status(400).json({
        success: false,
        message: "Chapter is required",
      });
    }

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic is required",
      });
    }

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    // =====================
    // CHECK SUBJECT
    // =====================

    const subjectData = await Subject.findById(subject);

    if (!subjectData) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    // =====================
    // VIDEO URL
    // =====================

    let videoUrl = "";

    if (req.files && req.files.video && req.files.video[0]) {
      videoUrl = await uploadToBunny(req.files.video[0], "videos");
    } else if (videoLink) {
      videoUrl = videoLink;
    }

    // =====================
    // THUMBNAIL
    // =====================

    let thumbnail = "";

    if (req.files && req.files.thumbnail && req.files.thumbnail[0]) {
      thumbnail = await uploadToBunny(req.files.thumbnail[0], "video-thumbnails");
    }

    // =====================
    // CREATE VIDEO
    // =====================

    const video = await Video.create({
      subject,
      chapter,
      topic,
      title,
      description,
      videoUrl,
      thumbnail,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Video created successfully",
      data: video,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =================================
// GET ALL VIDEOS
// =================================

exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("subject")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: videos.length,
      data: videos,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =================================
// GET VIDEOS BY SUBJECT
// =================================

exports.getVideosBySubject = async (req, res) => {
  try {
    const { subjectId } = req.params;

    // =====================
    // CHECK SUBJECT
    // =====================

    const subjectData = await Subject.findById(subjectId);

    if (!subjectData) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    // =====================
    // FETCH VIDEOS
    // =====================

    const videos = await Video.find({ subject: subjectId })
      .populate("subject")
      .sort({ chapter: 1, topic: 1, createdAt: 1 });

    // =====================
    // GROUP BY CHAPTER → TOPIC
    // =====================

    const grouped = {};

    videos.forEach((video) => {
      const chapterKey = video.chapter;
      const topicKey = video.topic;

      if (!grouped[chapterKey]) {
        grouped[chapterKey] = {};
      }

      if (!grouped[chapterKey][topicKey]) {
        grouped[chapterKey][topicKey] = [];
      }

      grouped[chapterKey][topicKey].push(video);
    });

    // =====================
    // FORMAT RESPONSE
    // =====================

    const chapters = Object.keys(grouped).map((chapterName) => {
      const topics = Object.keys(grouped[chapterName]).map((topicName) => ({
        topic: topicName,
        videos: grouped[chapterName][topicName],
      }));

      return {
        chapter: chapterName,
        totalTopics: topics.length,
        totalVideos: topics.reduce((sum, t) => sum + t.videos.length, 0),
        topics,
      };
    });

    res.status(200).json({
      success: true,
      subject: subjectData,
      totalVideos: videos.length,
      totalChapters: chapters.length,
      data: chapters,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =================================
// GET SINGLE VIDEO
// =================================

exports.getSingleVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate("subject");

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    res.status(200).json({
      success: true,
      data: video,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =================================
// UPDATE VIDEO
// =================================

exports.updateVideo = async (req, res) => {
  try {
    const {
      subject,
      chapter,
      topic,
      title,
      description,
      videoLink,
      status,
    } = req.body;

    const oldVideo = await Video.findById(req.params.id);

    if (!oldVideo) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    // =====================
    // VIDEO URL
    // =====================

    let videoUrl = oldVideo.videoUrl;

    if (req.files && req.files.video && req.files.video[0]) {
      videoUrl = await uploadToBunny(req.files.video[0], "videos");
    } else if (videoLink) {
      videoUrl = videoLink;
    }

    // =====================
    // THUMBNAIL
    // =====================

    let thumbnail = oldVideo.thumbnail;

    if (req.files && req.files.thumbnail && req.files.thumbnail[0]) {
      thumbnail = await uploadToBunny(req.files.thumbnail[0], "video-thumbnails");
    }

    // =====================
    // UPDATE VIDEO
    // =====================

    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      {
        subject,
        chapter,
        topic,
        title,
        description,
        videoUrl,
        thumbnail,
        status,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Video updated successfully",
      data: updatedVideo,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =================================
// DELETE VIDEO
// =================================

exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Video deleted successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};