// const jwt = require("jsonwebtoken");

// const userAuth =
//   async (req, res, next) => {

//     try {

//       let token =
//         req.headers.authorization;

//       // ======================
//       // CHECK TOKEN
//       // ======================

//       if (
//         !token ||
//         !token.startsWith("Bearer")
//       ) {

//         return res.status(401).json({

//           success: false,

//           message:
//             "Unauthorized access",

//         });

//       }

//       // ======================
//       // GET TOKEN
//       // ======================

//       token =
//         token.split(" ")[1];

//       // ======================
//       // VERIFY TOKEN
//       // ======================

//       const decoded =
//         jwt.verify(
//           token,
//           process.env.JWT_SECRET
//         );

//       // ======================
//       // SAVE USER
//       // ======================

//       req.user = decoded;

//       next();

//     } catch (error) {

//       console.log(error);

//       res.status(401).json({

//         success: false,

//         message:
//           "Invalid token",

//       });

//     }

//   };

// module.exports =
//   userAuth;

const jwt =
  require("jsonwebtoken");

const User =
  require("../models/User");

const userAuth =
  async (
    req,
    res,
    next
  ) => {

    try {

      let token =
        req.headers.authorization;

      // ======================
      // CHECK TOKEN
      // ======================

      if (

        !token ||

        !token.startsWith(
          "Bearer"
        )

      ) {

        return res.status(401).json({

          success: false,

          message:
            "Unauthorized access",

        });

      }

      // ======================
      // GET TOKEN
      // ======================

      token =
        token.split(" ")[1];

      // ======================
      // VERIFY TOKEN
      // ======================

      const decoded =
        jwt.verify(

          token,

          process.env.JWT_SECRET

        );

      // ======================
      // CHECK USER
      // ======================

      const user =
        await User.findById(
          decoded.id
        ).select("-password");

      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            "User not found",

        });

      }

      // ======================
      // SAVE USER
      // ======================

      req.user =
        user;

      next();

    } catch (error) {

      console.log(error);

      res.status(401).json({

        success: false,

        message:
          "Invalid token",

      });

    }

  };

module.exports =
  userAuth;