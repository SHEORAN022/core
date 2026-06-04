// =====================================
// controllers/downloadedLectureController.js
// =====================================

const DownloadedLecture =
  require(
    "../models/DownloadedLecture"
  );

const ReelModel =
  require(
    "../models/ReelModel"
  );

// =====================================
// DOWNLOAD LECTURE
// =====================================

exports.downloadLecture =
  async (req, res) => {

    try {

      const {

        reelId,
        fileSize,
        fileType,

      } = req.body;

      // CHECK REEL

      const reel =
        await ReelModel.findById(
          reelId
        );

      if (!reel) {

        return res.status(404).json({

          success: false,

          message:
            "Reel not found",

        });

      }

      // ALREADY DOWNLOADED

      const alreadyDownloaded =

        await DownloadedLecture.findOne({

          user:
            req.user._id,

          reel:
            reelId,

        });

      if (alreadyDownloaded) {

        return res.status(400).json({

          success: false,

          message:
            "Already downloaded",

        });

      }

      // SAVE DOWNLOAD

      const download =
        await DownloadedLecture.create({

          user:
            req.user._id,

          reel:
            reelId,

          fileSize,

          fileType,

        });

      res.status(201).json({

        success: true,

        message:
          "Lecture downloaded successfully",

        data:
          download,

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
// GET DOWNLOADED LECTURES
// =====================================

exports.getDownloadedLectures =
  async (req, res) => {

    try {

      const downloads =
        await DownloadedLecture.find({

          user:
            req.user._id,

        })

        .populate({

          path: "reel",

          populate: {

            path: "teacher",

            select:
              "name username",

          },

        })

        .sort({

          createdAt: -1,

        });

      // FORMAT

      const formatted =
        downloads.map(

          (item) => ({

            id:
              item.reel?._id ||

              "",

            title:
              item.reel?.title ||

              "",

            subject:

              item.reel?.type ||

              "",

            fileSize:
              item.fileSize ||

              "0 MB",

            fileType:
              item.fileType ||

              "MP4",

            subtitle:

              `${item.reel?.type} • ${item.fileSize} • ${item.fileType}`,

          })

        );

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
// REMOVE DOWNLOAD
// =====================================

exports.removeDownloadedLecture =
  async (req, res) => {

    try {

      const { reelId } =
        req.params;

      const deleted =
        await DownloadedLecture.findOneAndDelete({

          user:
            req.user._id,

          reel:
            reelId,

        });

      if (!deleted) {

        return res.status(404).json({

          success: false,

          message:
            "Download not found",

        });

      }

      res.status(200).json({

        success: true,

        message:
          "Download removed successfully",

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