const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Admin = require("../models/Admin");

// =======================================
// ADMIN AUTH
// =======================================

const protectAdmin = async (
  req,
  res,
  next
) => {
  try {

    let token;

    // ======================
    // CHECK TOKEN
    // ======================

    if (

      req.headers.authorization &&

      req.headers.authorization.startsWith(
        "Bearer"
      )

    ) {

      token =
        req.headers.authorization.split(
          " "
        )[1];

    }

    // ======================
    // TOKEN NOT FOUND
    // ======================

    if (!token) {

      return res.status(401).json({

        success: false,

        message:
          "Admin token missing",

      });

    }

    // ======================
    // VERIFY TOKEN
    // ======================

    const decoded =
      jwt.verify(

        token,

        process.env.JWT_SECRET

      );

    // ======================
    // FIND ADMIN
    // ======================

    const admin =
      await Admin.findById(
        decoded.id
      ).select("-password");

    if (!admin) {

      return res.status(403).json({

        success: false,

        message:
          "Admin access only",

      });

    }

    // ======================
    // SAVE ADMIN
    // ======================

    req.admin =
      admin;

    next();

  } catch (error) {

    console.log(error);

    res.status(401).json({

      success: false,

      message:
        "Invalid admin token",

    });

  }
};

// =======================================
// USER AUTH
// =======================================

const userAuth = async (
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
    // FIND USER
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

// =======================================
// EXPORTS
// =======================================

module.exports = {
  protectAdmin,
  userAuth,
};