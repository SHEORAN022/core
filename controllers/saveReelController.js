
const SaveReel =
  require(
    "../models/SaveReel"
  );

const ReelModel =
  require(
    "../models/ReelModel"
  );

// =====================================
// SAVE REEL
// =====================================

exports.saveReel =
  async (req, res) => {

    try {

      const {

        reelId,

      } = req.body;

      // ======================
      // CHECK REEL
      // ======================

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

      // ======================
      // ALREADY SAVED
      // ======================

      const alreadySaved =
        await SaveReel.findOne({

          user:
            req.user._id,

          reel:
            reelId,

        });

      if (alreadySaved) {

        return res.status(400).json({

          success: false,

          message:
            "Reel already saved",

        });

      }

      // ======================
      // SAVE REEL
      // ======================

      const saved =
        await SaveReel.create({

          user:
            req.user._id,

          reel:
            reelId,

        });

      // ======================
      // RESPONSE
      // ======================

      res.status(201).json({

        success: true,

        message:
          "Reel saved successfully",

        saved,

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
// GET SAVED REELS
// =====================================

exports.getSavedReels =
  async (req, res) => {

    try {

      const savedReels =
        await SaveReel.find({

          user:
            req.user._id,

        })

        .populate({

          path:
            "reel",

          populate: {

            path:
              "teacher",

            select:
              "name username profileImage",

          },

        })

        .sort({

          createdAt: -1,

        });

      // ======================
      // FORMAT DATA
      // ======================

      const result =
        savedReels.map(
          (item) => ({

            _id:
              item._id,

            reelId:
              item.reel?._id,

            title:
              item.reel?.title,

            description:
              item.reel?.description,

            videoUrl:
              item.reel?.videoUrl,

            thumbnail:
              item.reel?.thumbnail,

            type:
              item.reel?.type,

            likes:
              item.reel?.likes,

            comments:
              item.reel?.comments,

            teacherName:
              item.reel?.teacher
                ?.name || "",

            teacherUsername:
              item.reel?.teacher
                ?.username || "",

            teacherProfile:
              item.reel?.teacher
                ?.profileImage || "",

          })

        );

      res.status(200).json({

        success: true,

        total:
          result.length,

        result,

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
// REMOVE SAVED REEL
// =====================================

exports.removeSavedReel =
  async (req, res) => {

    try {

      const saved =
        await SaveReel.findOne({

          user:
            req.user._id,

          reel:
            req.params.reelId,

        });

      if (!saved) {

        return res.status(404).json({

          success: false,

          message:
            "Saved reel not found",

        });

      }

      await saved.deleteOne();

      res.status(200).json({

        success: true,

        message:
          "Saved reel removed successfully",

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

