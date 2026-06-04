const Leaderboard =
  require("../models/Leaderboard");



exports.fetchLeaderboard =
  async (req, res) => {

    try {

      const rows =
        await Leaderboard.find({

          assessment_id:
            req.params.assessmentId,

        })

        .sort({
          score: -1,
        });

      res.json({

        success: true,

        leaderboard: rows,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }
  };