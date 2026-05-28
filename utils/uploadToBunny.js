const axios =
  require("axios");

const uploadToBunny =
  async (
    file,
    folder = "uploads"
  ) => {

    try {

      const fileName =

        Date.now() +
        "-" +
        file.originalname;

      let baseUrl =
        "https://storage.bunnycdn.com";

      // REGION

      if (

        process.env.BUNNY_REGION &&

        process.env.BUNNY_REGION !== "de"

      ) {

        baseUrl =

          `https://${process.env.BUNNY_REGION}.storage.bunnycdn.com`;

      }

      // STORAGE URL

      const storageUrl =

        `${baseUrl}/${process.env.BUNNY_STORAGE_ZONE}/${folder}/${fileName}`;

      // UPLOAD

      const response =
        await axios.put(

          storageUrl,

          file.buffer,

          {

            headers: {

              accesskey:

                process.env.BUNNY_ACCESS_KEY.trim(),

              "Content-Type":
                file.mimetype,

              Accept:
                "application/json",

            },

            maxBodyLength:
              Infinity,

          }

        );

      // CHECK RESPONSE

      if (

        response.status !== 200 &&

        response.status !== 201

      ) {

        throw new Error(

          `Bunny upload failed`

        );

      }

      // RETURN CDN URL

      return (

        `${process.env.BUNNY_CDN}/${folder}/${fileName}`

      );

    } catch (error) {

      console.log(error);

      throw new Error(

        "Bunny Upload Failed"

      );

    }

  };

module.exports =
  uploadToBunny;