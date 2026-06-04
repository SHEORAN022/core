
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

// const admin = require("../config/firebase");

// const User = require("../models/User");

// const jwt = require("jsonwebtoken");

// // ===================================
// // GOOGLE LOGIN
// // ===================================

// const googleLogin =
//   async (req, res) => {

//     try {

//       const { token } = req.body;

//       // =========================
//       // CHECK TOKEN
//       // =========================

//       if (!token) {

//         return res.status(400).json({

//           success: false,

//           message:
//             "Firebase token required",

//         });

//       }

//       // =========================
//       // VERIFY FIREBASE TOKEN
//       // =========================

//       const decodedToken =
//         await admin
//           .auth()
//           .verifyIdToken(token);

//       const {

//         uid,
//         name,
//         email,
//         picture,

//       } = decodedToken;

//       // =========================
//       // CHECK USER
//       // =========================

//       let user =
//         await User.findOne({

//           email,

//         });

//       // =========================
//       // CREATE USER
//       // =========================

//       if (!user) {

//         user =
//           await User.create({

//             name:
//               name || "",

//             email,

//             googleId:
//               uid,

//             profilePic:
//               picture || "",

//           });

//       }

//       // =========================
//       // JWT TOKEN
//       // =========================

//       const jwtToken =
//         jwt.sign(

//           {

//             id:
//               user._id,

//             name:
//               user.name,

//             email:
//               user.email,

//           },

//           process.env.JWT_SECRET,

//           {

//             expiresIn:
//               "30d",

//           }

//         );

//       // =========================
//       // RESPONSE
//       // =========================

//       res.status(200).json({

//         success: true,

//         message:
//           "Google login success",

//         token:
//           jwtToken,

//         user,

//       });

//     } catch (error) {

//       console.log(error);

//       res.status(500).json({

//         success: false,

//         message:
//           error.message,

//       });

//     }

//   };
//   const getAllUsers =
//   async (req, res) => {

//     try {

//       const users =
//         await User.find()

//           .sort({
//             createdAt: -1,
//           });

//       res.status(200).json({

//         success: true,

//         total:
//           users.length,

//         users,

//       });

//     } catch (error) {

//       console.log(error);

//       res.status(500).json({

//         success: false,

//         message:
//           error.message,

//       });

//     }

//   };

// // ===================================
// // DELETE USER
// // ===================================

// const deleteUser =
//   async (req, res) => {

//     try {

//       const user =
//         await User.findByIdAndDelete(
//           req.params.id
//         );

//       if (!user) {

//         return res.status(404).json({

//           success: false,

//           message: "User not found",

//         });

//       }

//       res.status(200).json({

//         success: true,

//         message: "User deleted successfully",

//       });

//     } catch (error) {

//       console.log(error);

//       res.status(500).json({

//         success: false,

//         message: error.message,

//       });

//     }

//   };

// module.exports = {

//   googleLogin,
//     getAllUsers,
//     deleteUser,

// };
