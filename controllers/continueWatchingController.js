const ContinueWatching =
  require(
    "../models/ContinueWatching"
  );

const Video =
  require(
    "../models/Video"
  );

// =====================================
// SAVE WATCH PROGRESS
// =====================================

exports.saveWatchProgress =
  async (req, res) => {

    try {

      const {

        videoId,
        watchedSeconds,
        durationSeconds,

      } = req.body;

      // =====================
      // CHECK VIDEO
      // =====================

      const video =
        await Video.findById(
          videoId
        );

      if (!video) {

        return res.status(404).json({

          success: false,

          message:
            "Video not found",

        });

      }

      // =====================
      // CHECK EXISTING
      // =====================

      let progress =
        await ContinueWatching.findOne({

          user: req.user._id,

          video: videoId,

        });

      // =====================
      // COMPLETE CHECK
      // =====================

      const isCompleted =

        watchedSeconds >=
        durationSeconds;

      // =====================
      // UPDATE
      // =====================

      if (progress) {

        progress.watchedSeconds =
          watchedSeconds;

        progress.durationSeconds =
          durationSeconds;

        progress.isCompleted =
          isCompleted;

        progress.lastWatchedAt =
          new Date();

        await progress.save();

      } else {

        progress =
          await ContinueWatching.create({

            user:
              req.user._id,

            video:
              videoId,

            watchedSeconds,

            durationSeconds,

            isCompleted,

          });

      }

      res.status(200).json({

        success: true,

        message:
          "Progress saved",

        data:
          progress,

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

// =====================================
// GET CONTINUE WATCHING
// =====================================

exports.getContinueWatching =
  async (req, res) => {

    try {

      const data =
        await ContinueWatching.find({

          user: req.user._id,

          isCompleted: false,

        })

          .populate({

            path: "video",

            populate: {

              path: "subject",

            },

          })

          .sort({

            lastWatchedAt: -1,

          });

      // =====================
      // FORMAT
      // =====================

      const formatted =
        data.map((item) => ({

          id:
            item.video?._id,

          title:
            item.video?.title,

          thumbnailUrl:
            item.video?.thumbnail,

          videoUrl:
            item.video?.videoUrl,

          progress:

            formatDuration(
              item.watchedSeconds
            ),

          educator:
            "Rajesh Sir",

          durationSeconds:
            item.durationSeconds,

          lastWatchedAt:
            item.lastWatchedAt,

          subject:
            item.video?.subject,

        }));

      res.status(200).json({

        success: true,

        total:
          formatted.length,

        data:
          formatted,

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

// =====================================
// FORMAT TIME
// =====================================

function formatDuration(
  seconds
) {

  const mins =
    Math.floor(seconds / 60);

  const secs =
    seconds % 60;

  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}