const multer = require("multer");


// MEMORY STORAGE

const storage =
  multer.memoryStorage();


// MULTER

const upload = multer({
  storage,
});

module.exports = upload;