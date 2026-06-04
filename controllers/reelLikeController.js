const ReelLike =
  require(
    "../models/ReelLike"
  );

const ReelModel =
  require(
    "../models/ReelModel"
  );

// =====================================
// TOGGLE LIKE
// =====================================

exports.toggleLike =
  async (req, res) => {

    try {

      const { reelId } =
        req.body;

      // =====================
      // CHECK REEL
      // =====================

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

      // =====================
      // CHECK EXISTING LIKE
      // =====================

      const existingLike =

        await ReelLike.findOne({

          user:
            req.user._id,

          reel:
            reelId,

        });

      // =====================
      // UNLIKE
      // =====================

      if (existingLike) {

        await ReelLike.findByIdAndDelete(

          existingLike._id

        );

        // DECREASE COUNT

        reel.likes =
          Math.max(
            0,
            reel.likes - 1
          );

        await reel.save();

        return res.status(200).json({

          success: true,

          liked: false,

          likes:
            reel.likes,

          message:
            "Reel unliked",

        });

      }

      // =====================
      // LIKE
      // =====================

      await ReelLike.create({

        user:
          req.user._id,

        reel:
          reelId,

      });

      // INCREASE COUNT

      reel.likes += 1;

      await reel.save();

      res.status(200).json({

        success: true,

        liked: true,

        likes:
          reel.likes,

        message:
          "Reel liked",

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
// GET USER LIKED REELS
// =====================================

exports.getLikedReels =
  async (req, res) => {

    try {

      const likedReels =
        await ReelLike.find({

          user:
            req.user._id,

        })

        .populate({

          path: "reel",

          populate: {

            path: "teacher",

            select:
              "name username profileImage",

          },

        })

        .sort({

          createdAt: -1,

        });

      // =====================
      // FORMAT RESPONSE
      // =====================

      const formatted =
        likedReels.map(

          (item) => ({

            id:
              item.reel?._id ||

              "",

            title:
              item.reel?.title ||

              "",

            description:

              item.reel
                ?.description ||

              "",

            videoUrl:

              item.reel
                ?.videoUrl ||

              "",

            thumbnail:

              item.reel
                ?.thumbnail ||

              "",

            likes:
              item.reel?.likes ||

              0,

            comments:

              item.reel
                ?.comments ||

              0,

            type:
              item.reel?.type ||

              "",

            teacherName:

              item.reel?.teacher
                ?.name ||

              "",

            teacherUsername:

              item.reel?.teacher
                ?.username ||

              "",

            teacherProfile:

              item.reel?.teacher
                ?.profileImage ||

              "",

            isLiked: true,

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