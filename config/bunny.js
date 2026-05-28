const axios = require("axios");

const uploadToBunny = async (file, folder = "uploads") => {
  try {

    const fileName =
      Date.now() + "-" + file.originalname;

    let baseUrl =
      "https://storage.bunnycdn.com";

    // Germany = default
    if (
      process.env.BUNNY_REGION &&
      process.env.BUNNY_REGION !== "de"
    ) {
      baseUrl =
        `https://${process.env.BUNNY_REGION}.storage.bunnycdn.com`;
    }

    const storageUrl =
      `${baseUrl}/${process.env.BUNNY_STORAGE_ZONE}/${folder}/${fileName}`;

    // ===============================
    // DEBUG LOGS
    // ===============================

    console.log("========== BUNNY DEBUG ==========");
    console.log("ACCESS KEY:", process.env.BUNNY_ACCESS_KEY);
    console.log("REGION:", process.env.BUNNY_REGION);
    console.log("ZONE:", process.env.BUNNY_STORAGE_ZONE);
    console.log("CDN:", process.env.BUNNY_CDN);
    console.log("UPLOAD URL:", storageUrl);
    console.log("================================");

    const response = await axios.put(
      storageUrl,
      file.buffer,
      {
      headers: {
  accesskey:
    process.env.BUNNY_ACCESS_KEY.trim(),

  "Content-Type":
    file.mimetype,

  Accept: "application/json",
},
        maxBodyLength: Infinity,
      }
    );

    if (
      response.status !== 200 &&
      response.status !== 201
    ) {
      throw new Error(
        `Bunny rejected upload: ${response.status}`
      );
    }

    return `${process.env.BUNNY_CDN}/${folder}/${fileName}`;

  } catch (error) {

    if (error.response) {

      console.error(
        "Bunny error:",
        error.response.status,
        error.response.data
      );

    } else {

      console.error(
        "Bunny error:",
        error.message
      );

    }

    throw new Error(
      "Bunny Upload Failed: " +
      error.message
    );
  }
};

module.exports = uploadToBunny;