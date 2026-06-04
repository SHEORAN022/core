const Test =
  require(
    "../models/Test"
  );

// ======================================
// GET UPCOMING TESTS
// ======================================

exports.getUpcomingTests =
  async (req, res) => {

    try {

      // CURRENT DATE TIME

      const currentTime =
        new Date();

      // ==========================
      // FIND UPCOMING TESTS
      // ==========================

      const tests =
        await Test.find({

          status: "Active",

          startDateTime: {

            $gte:
              currentTime,

          },

        })

        .populate(

          "exam",

          "name image"

        )

        .populate(

          "teacher",

          "teacherName profileImage"

        )

        .populate(

          "category",

          "name"

        )

        .sort({

          startDateTime: 1,

        });

      // ==========================
      // FORMAT RESPONSE
      // ==========================

      const formatted =
        tests.map(

          (item) => ({

            _id:
              item._id,

            title:
              item.title ||

              "",

            examType:

              item.exam?.name ||

              "",

            questions:

              item.totalQuestions ||

              0,

            date:
              item.startDateTime,

            endDate:
              item.endDateTime,

            duration:

              item.duration ||

              0,

            status:
              item.status ||

              "",

            subject:
              item.subject ||

              "",

            teacher:

              item.teacher
                ?.teacherName ||

              "",

            teacherImage:

              item.teacher
                ?.profileImage ||

              "",

            category:

              item.category
                ?.name ||

              "",

            image:

              item.exam?.image ||

              "",

          })

        );

      // ==========================
      // RESPONSE
      // ==========================

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