
// const Admin = require("../models/Admin");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// // ✅ REGISTER ADMIN
// exports.registerAdmin = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if admin exists
//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin) {
//       return res.status(400).json({
//         success: false,
//         message: "Admin already exists"
//       });
//     }

//     // Create admin
//     const admin = await Admin.create({
//       name,
//       email,
//       password
//     });

//     // Generate token with role
//     const token = jwt.sign(
//       { 
//         id: admin._id, 
//         email: admin.email,
//         role: "admin"  // ✅ IMPORTANT
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.status(201).json({
//       success: true,
//       message: "Admin created successfully",
//       token,
//       admin: {
//         id: admin._id,
//         name: admin.name,
//         email: admin.email
//       }
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // ✅ LOGIN ADMIN
// exports.loginAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if admin exists
//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid credentials"
//       });
//     }

//     // Check password
//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid credentials"
//       });
//     }

//     // Generate token with role
//     const token = jwt.sign(
//       { 
//         id: admin._id, 
//         email: admin.email,
//         role: "admin"  // ✅ IMPORTANT
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//       admin: {
//         id: admin._id,
//         name: admin.name,
//         email: admin.email
//       }
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // ✅ GET ADMIN PROFILE
// exports.getAdminProfile = async (req, res) => {
//   try {
//     const admin = await Admin.findById(req.admin.id).select("-password");
//     if (!admin) {
//       return res.status(404).json({
//         success: false,
//         message: "Admin not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       admin
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };


const Admin =
  require("../models/Admin");

const jwt =
  require("jsonwebtoken");

const bcrypt =
  require("bcryptjs");



// ======================================
// REGISTER ADMIN
// ======================================

exports.registerAdmin =
  async (req, res) => {

    try {

      const {

        name,

        email,

        password,

        role,

      } = req.body;



      // ======================================
      // VALIDATION
      // ======================================

      if (!email) {

        return res.status(400).json({

          success: false,

          message:
            "Email is required",

        });

      }

      if (!password) {

        return res.status(400).json({

          success: false,

          message:
            "Password is required",

        });

      }



      // ======================================
      // CHECK EXISTING ADMIN
      // ======================================

      const existingAdmin =
        await Admin.findOne({

          email,

        });

      if (existingAdmin) {

        return res.status(400).json({

          success: false,

          message:
            "Admin already exists",

        });

      }



      // ======================================
      // HASH PASSWORD
      // ======================================

      const hashedPassword =
        await bcrypt.hash(

          password,

          10

        );



      // ======================================
      // CREATE ADMIN
      // ======================================

      const admin =
        await Admin.create({

          name,

          email,

          password:
            hashedPassword,

          role:
            role || "content_studio",

        });



      // ======================================
      // GENERATE TOKEN
      // ======================================

      const token =
        jwt.sign(

          {

            id:
              admin._id,

            email:
              admin.email,

            role:
              admin.role,

          },

          process.env.JWT_SECRET,

          {

            expiresIn:
              "7d",

          }

        );



      // ======================================
      // RESPONSE
      // ======================================

      res.status(201).json({

        success: true,

        message:
          "Admin created successfully",

        token,

        admin: {

          id:
            admin._id,

          name:
            admin.name,

          email:
            admin.email,

        },

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



// ======================================
// LOGIN ADMIN
// ======================================

exports.loginAdmin =
  async (req, res) => {

    try {

      const {

        email,

        password,

      } = req.body;



      // ======================================
      // VALIDATION
      // ======================================

      if (!email) {

        return res.status(400).json({

          success: false,

          message:
            "Email is required",

        });

      }

      if (!password) {

        return res.status(400).json({

          success: false,

          message:
            "Password is required",

        });

      }



      // ======================================
      // FIND ADMIN
      // ======================================

      const admin =
        await Admin.findOne({

          email,

        });

      if (!admin) {

        return res.status(401).json({

          success: false,

          message:
            "Invalid credentials",

        });

      }



      // ======================================
      // CHECK ACTIVE
      // ======================================

      if (!admin.is_active) {

        return res.status(403).json({

          success: false,

          message:
            "Account is disabled",

        });

      }



      // ======================================
      // CHECK PASSWORD
      // ======================================

      const isMatch =
        await bcrypt.compare(

          password,

          admin.password

        );

      if (!isMatch) {

        return res.status(401).json({

          success: false,

          message:
            "Invalid credentials",

        });

      }



      // ======================================
      // GENERATE TOKEN
      // ======================================

      const token =
        jwt.sign(

          {

            id:
              admin._id,

            email:
              admin.email,

            role:
              admin.role,

          },

          process.env.JWT_SECRET,

          {

            expiresIn:
              "7d",

          }

        );



      // ======================================
      // RESPONSE
      // ======================================

      res.status(200).json({

        success: true,

        message:
          "Login successful",

        token,

        admin: {

          id:
            admin._id,

          name:
            admin.name,

          email:
            admin.email,

        },

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



// ======================================
// GET ADMIN PROFILE
// ======================================

exports.getAdminProfile =
  async (req, res) => {

    try {

      const admin =
        await Admin.findById(

          req.admin.id

        ).select("-password");



      if (!admin) {

        return res.status(404).json({

          success: false,

          message:
            "Admin not found",

        });

      }



      // ======================================
      // RESPONSE
      // ======================================

      res.status(200).json({

        success: true,

        admin: {

          id:
            admin._id,

          name:
            admin.name,

          email:
            admin.email,

        },

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

