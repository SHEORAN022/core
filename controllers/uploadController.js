const uploadToBunny = require(
  "../config/bunny"
);


// SINGLE IMAGE UPLOAD

exports.uploadImage =
  async (req, res) => {

    try {

      // CHECK FILE

      if (!req.file) {

        return res.status(400).json({
          success: false,
          message:
            "No File Uploaded",
        });

      }


      // UPLOAD TO BUNNY

      const imageUrl =
        await uploadToBunny(
          req.file,
          "images"
        );


      // RESPONSE

      res.status(200).json({
        success: true,
        message:
          "Image Uploaded Successfully",

        url: imageUrl,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  };



// VIDEO UPLOAD

exports.uploadVideo =
  async (req, res) => {

    try {

      if (!req.file) {

        return res.status(400).json({
          success: false,
          message:
            "No File Uploaded",
        });

      }

      const videoUrl =
        await uploadToBunny(
          req.file,
          "videos"
        );

      res.status(200).json({
        success: true,
        message:
          "Video Uploaded Successfully",

        url: videoUrl,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  };