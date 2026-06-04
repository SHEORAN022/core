const Reel =
  require("../models/Reel");

const ReelEngagement =
  require(
    "../models/ReelEngagement"
  );

const uploadToBunny =
  require(
    "../utils/uploadToBunny"
  );



// ======================================
// CREATE REEL
// ======================================

exports.createReel =
  async (req, res) => {

    try {

      const {

        exam_id,
        subject_id,
        chapter_id,
        topic_id,
        teacher_id,
        title,
        description,
        duration,
        pyq_year,
        is_pyq,
        is_pro,
        language,
        tags,

      } = req.body;



      // ======================================
      // VALIDATION
      // ======================================

      if (!topic_id) {

        return res.status(400).json({

          success: false,

          message:
            "Topic is required",

        });

      }

      if (!teacher_id) {

        return res.status(400).json({

          success: false,

          message:
            "Teacher is required",

        });

      }

      if (!title) {

        return res.status(400).json({

          success: false,

          message:
            "Title is required",

        });

      }



      // ======================================
      // FILES
      // ======================================

      let video_url = "";

      let thumbnail_url = "";



      // VIDEO

      if (
        req.files?.video?.[0]
      ) {

        video_url =
          await uploadToBunny(

            req.files.video[0],

            "reels/videos"

          );

      }



      // THUMBNAIL

      if (
        req.files?.thumbnail?.[0]
      ) {

        thumbnail_url =
          await uploadToBunny(

            req.files.thumbnail[0],

            "reels/thumbnails"

          );

      }



      // ======================================
      // CREATE REEL
      // ======================================

      const reel =
        await Reel.create({

          exam_id,

          subject_id,

          chapter_id,

          topic_id,

          teacher_id,

          title,

          description,

          duration,

          pyq_year,

          is_pyq,

          is_pro,

          language,

          tags,

          video_url,

          thumbnail_url,

        });



      res.status(201).json({

        success: true,

        message:
          "Reel created successfully",

        reel,

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
// GET ALL REELS
// ======================================

exports.fetchAllReels =
  async (req, res) => {

    try {

      const page =
        Number(req.query.page) || 1;

      const limit =
        Number(req.query.limit) || 20;

      const skip =
        (page - 1) * limit;

      const search =
        req.query.search || "";



      const query = {

        is_active: true,

        status: "published",

        title: {

          $regex: search,

          $options: "i",

        },

      };



      const reels =
        await Reel.find(query)

        .populate("exam_id")

        .populate("subject_id")

        .populate("chapter_id")

        .populate("topic_id")

        .populate("teacher_id")

        .sort({
          createdAt: -1,
        })

        .skip(skip)

        .limit(limit);



      // ======================================
      // ENGAGEMENT STATS
      // ======================================

      const finalReels =
        await Promise.all(

          reels.map(
            async (reel) => {

              const reel_id =
                reel._id;

              const likes =
                await ReelEngagement.countDocuments({

                  reel_id,

                  type: "like",

                  is_deleted: false,

                });

              const comments =
                await ReelEngagement.countDocuments({

                  reel_id,

                  type: "comment",

                  is_deleted: false,

                });

              const views =
                await ReelEngagement.countDocuments({

                  reel_id,

                  type: "view",

                  is_deleted: false,

                });

              const shares =
                await ReelEngagement.countDocuments({

                  reel_id,

                  type: "share",

                  is_deleted: false,

                });

              const saves =
                await ReelEngagement.countDocuments({

                  reel_id,

                  type: "save",

                  is_deleted: false,

                });

              return {

                ...reel.toObject(),

                stats: {

                  likes,

                  comments,

                  views,

                  shares,

                  saves,

                },

              };

            }
          )
        );



      const total =
        await Reel.countDocuments(
          query
        );



      res.status(200).json({

        success: true,

        count:
          finalReels.length,

        total,

        page,

        total_pages:
          Math.ceil(
            total / limit
          ),

        reels:
          finalReels,

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
// GET REELS BY TOPIC
// ======================================

exports.fetchReelsByTopic =
  async (req, res) => {

    try {

      const reels =
        await Reel.find({

          topic_id:
            req.params.topicId,

          is_active: true,

          status: "published",

        })

        .populate("topic_id")

        .populate("teacher_id")

        .sort({
          createdAt: -1,
        });



      res.status(200).json({

        success: true,

        count:
          reels.length,

        reels,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };



// ======================================
// GET REELS BY TEACHER
// ======================================

exports.fetchReelsByTeacher =
  async (req, res) => {

    try {

      const reels =
        await Reel.find({

          teacher_id:
            req.params.teacherId,

          is_active: true,

          status: "published",

        })

        .populate("topic_id")

        .populate("teacher_id")

        .sort({
          createdAt: -1,
        });



      res.status(200).json({

        success: true,

        count:
          reels.length,

        reels,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };



// ======================================
// GET PYQ REELS
// ======================================

exports.fetchPyqReels =
  async (req, res) => {

    try {

      const reels =
        await Reel.find({

          is_active: true,

          is_pyq: true,

          status: "published",

        })

        .populate("topic_id")

        .populate("teacher_id")

        .sort({
          pyq_year: -1,
        });



      res.status(200).json({

        success: true,

        count:
          reels.length,

        reels,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };



// ======================================
// GET SINGLE REEL
// ======================================

exports.fetchSingleReel =
  async (req, res) => {

    try {

      const reel =
        await Reel.findById(

          req.params.id

        )

        .populate("exam_id")

        .populate("subject_id")

        .populate("chapter_id")

        .populate("topic_id")

        .populate("teacher_id");



      if (!reel) {

        return res.status(404).json({

          success: false,

          message:
            "Reel not found",

        });

      }



      // ======================================
      // STATS
      // ======================================

      const reel_id =
        reel._id;

      const likes =
        await ReelEngagement.countDocuments({

          reel_id,

          type: "like",

          is_deleted: false,

        });

      const comments =
        await ReelEngagement.countDocuments({

          reel_id,

          type: "comment",

          is_deleted: false,

        });

      const views =
        await ReelEngagement.countDocuments({

          reel_id,

          type: "view",

          is_deleted: false,

        });

      const shares =
        await ReelEngagement.countDocuments({

          reel_id,

          type: "share",

          is_deleted: false,

        });

      const saves =
        await ReelEngagement.countDocuments({

          reel_id,

          type: "save",

          is_deleted: false,

        });



      res.status(200).json({

        success: true,

        reel: {

          ...reel.toObject(),

          stats: {

            likes,

            comments,

            views,

            shares,

            saves,

          },

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



// ======================================
// UPDATE REEL
// ======================================

exports.updateReel =
  async (req, res) => {

    try {

      const updateData = {

        ...req.body,

      };



      // VIDEO

      if (
        req.files?.video?.[0]
      ) {

        updateData.video_url =
          await uploadToBunny(

            req.files.video[0],

            "reels/videos"

          );

      }



      // THUMBNAIL

      if (
        req.files?.thumbnail?.[0]
      ) {

        updateData.thumbnail_url =
          await uploadToBunny(

            req.files.thumbnail[0],

            "reels/thumbnails"

          );

      }



      const reel =
        await Reel.findByIdAndUpdate(

          req.params.id,

          updateData,

          {

            returnDocument:
              "after",

          }

        )

        .populate("topic_id")

        .populate("teacher_id");



      if (!reel) {

        return res.status(404).json({

          success: false,

          message:
            "Reel not found",

        });

      }



      res.status(200).json({

        success: true,

        message:
          "Reel updated successfully",

        reel,

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
// DELETE REEL
// ======================================

exports.softDeleteReel =
  async (req, res) => {

    try {

      const reel =
        await Reel.findByIdAndUpdate(

          req.params.id,

          {

            is_active: false,

          },

          {

            returnDocument:
              "after",

          }

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

        message:
          "Reel deleted successfully",

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
// GET TOP VIDEOS
// ======================================

exports.fetchTopVideos =
  async (req, res) => {

    try {

      const page =
        Number(req.query.page) || 1;

      const limit =
        Number(req.query.limit) || 10;

      const skip =
        (page - 1) * limit;



      // ======================================
      // GET REELS
      // ======================================

      const reels =
        await Reel.find({

          is_active: true,

          status: "published",

        })

        .populate("exam_id")

        .populate("subject_id")

        .populate("chapter_id")

        .populate("topic_id")

        .populate("teacher_id");



      // ======================================
      // ADD STATS
      // ======================================

      const finalReels =
        await Promise.all(

          reels.map(
            async (reel) => {

              const reel_id =
                reel._id;

              const likes =
                await ReelEngagement.countDocuments({

                  reel_id,

                  type: "like",

                  is_deleted: false,

                });

              const comments =
                await ReelEngagement.countDocuments({

                  reel_id,

                  type: "comment",

                  is_deleted: false,

                });

              const views =
                await ReelEngagement.countDocuments({

                  reel_id,

                  type: "view",

                  is_deleted: false,

                });

              const shares =
                await ReelEngagement.countDocuments({

                  reel_id,

                  type: "share",

                  is_deleted: false,

                });

              const saves =
                await ReelEngagement.countDocuments({

                  reel_id,

                  type: "save",

                  is_deleted: false,

                });

              return {

                ...reel.toObject(),

                stats: {

                  likes,

                  comments,

                  views,

                  shares,

                  saves,

                },

              };

            }
          )
        );



      // ======================================
      // SORT BY VIEWS
      // ======================================

      const sortedReels =
        finalReels

        .filter(

          (reel) =>
            reel.stats.views > 0

        )

        .sort(

          (a, b) => {

            // VIEWS

            if (

              b.stats.views !==
              a.stats.views

            ) {

              return (
                b.stats.views -
                a.stats.views
              );

            }



            // LIKES

            if (

              b.stats.likes !==
              a.stats.likes

            ) {

              return (
                b.stats.likes -
                a.stats.likes
              );

            }



            // LATEST

            return (
              new Date(
                b.createdAt
              ) -

              new Date(
                a.createdAt
              )

            );

          }

        );



      // ======================================
      // PAGINATION
      // ======================================

      const paginatedReels =
        sortedReels.slice(

          skip,

          skip + limit

        );



      // ======================================
      // RESPONSE
      // ======================================

      res.status(200).json({

        success: true,

        count:
          paginatedReels.length,

        total:
          sortedReels.length,

        current_page:
          page,

        total_pages:
          Math.ceil(

            sortedReels.length /
            limit

          ),

        reels:
          paginatedReels,

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
// GET TEACHER REELS
// ======================================

exports.getTeacherReels =
  async (req, res) => {

    try {

      const teacher_id =
        req.params.teacherId;



      // ======================================
      // GET REELS
      // ======================================

      const reels =
        await Reel.find({

          teacher_id,

          is_active: true,

          status: "published",

        })

        .populate("exam_id")

        .populate("subject_id")

        .populate("chapter_id")

        .populate("topic_id")

        .populate("teacher_id")

        .sort({

          createdAt: -1,

        });



      // ======================================
      // RESPONSE
      // ======================================

      res.status(200).json({

        success: true,

        count:
          reels.length,

        reels,

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
// GET NEW ARRIVAL REELS
// ======================================
exports.fetchNewArrivalReels =
  async (req, res) => {

    try {

      const page =
        Number(req.query.page) || 1;

      const limit =
        Number(req.query.limit) || 10;

      const skip =
        (page - 1) * limit;

      const sevenDaysAgo =
        new Date();

      sevenDaysAgo.setDate(
        sevenDaysAgo.getDate() - 7
      );

      const query = {

        is_active: true,

        status: "published",

        createdAt: {
          $gte: sevenDaysAgo,
        },

      };

      const reels =
        await Reel.find(query)

          .populate("exam_id")
          .populate("subject_id")
          .populate("chapter_id")
          .populate("topic_id")
          .populate("teacher_id")

          .sort({
            createdAt: -1,
          })

          .skip(skip)

          .limit(limit);

      const total =
        await Reel.countDocuments(
          query
        );

      res.status(200).json({

        success: true,

        count: reels.length,

        total,

        current_page: page,

        total_pages:
          Math.ceil(
            total / limit
          ),

        reels,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };