// const admin = require("../config/firebase");
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");

// const googleLogin = async (req, res) => {
//   try {
//     const { token } = req.body;

//     if (!token) {
//       return res.status(400).json({
//         success: false,
//         message: "Token required",
//       });
//     }

//     // Verify Firebase Token
//     const decodedToken = await admin.auth().verifyIdToken(token);

//     const { uid, name, email, picture } = decodedToken;

//     let user = await User.findOne({ email });

//     // Create User if not exists
//     if (!user) {
//       user = await User.create({
//         name,
//         email,
//         googleId: uid,
//         profilePic: picture,
//       });
//     }

//     // JWT Token
//     const jwtToken = jwt.sign(
//       {
//         id: user._id,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "30d",
//       }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Google login success",
//       token: jwtToken,
//       user,
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// module.exports = {
//   googleLogin,
// };


const admin = require("../config/firebase");

const User = require("../models/User");

const jwt = require("jsonwebtoken");

// ===================================
// GOOGLE LOGIN
// ===================================

const googleLogin =
  async (req, res) => {

    try {

      const { token } = req.body;

      // =========================
      // CHECK TOKEN
      // =========================

      if (!token) {

        return res.status(400).json({

          success: false,

          message:
            "Firebase token required",

        });

      }

      // =========================
      // VERIFY FIREBASE TOKEN
      // =========================

      const decodedToken =
        await admin
          .auth()
          .verifyIdToken(token);

      const {

        uid,
        name,
        email,
        picture,

      } = decodedToken;

      // =========================
      // CHECK USER
      // =========================

      let user =
        await User.findOne({

          email,

        });

      // =========================
      // CREATE USER
      // =========================

      if (!user) {

        user =
          await User.create({

            name:
              name || "",

            email,

            googleId:
              uid,

            profilePic:
              picture || "",

          });

      }

      // =========================
      // JWT TOKEN
      // =========================

      const jwtToken =
        jwt.sign(

          {

            id:
              user._id,

            name:
              user.name,

            email:
              user.email,

          },

          process.env.JWT_SECRET,

          {

            expiresIn:
              "30d",

          }

        );

      // =========================
      // RESPONSE
      // =========================

      res.status(200).json({

        success: true,

        message:
          "Google login success",

        token:
          jwtToken,

        user,

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
  const getAllUsers =
  async (req, res) => {

    try {

      const users =
        await User.find()

          .sort({
            createdAt: -1,
          });

      res.status(200).json({

        success: true,

        total:
          users.length,

        users,

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

module.exports = {

  googleLogin,
    getAllUsers,

};
