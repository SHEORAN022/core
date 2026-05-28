const dotenv = require("dotenv");
dotenv.config();
const express = require("express");

const cors = require("cors");

const connectDB = require("./config/db");



connectDB();

const app = express();


// Middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const questionRoutes =
  require("./routes/questionRoutes");

  const testRoutes =
  require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");
const testAttemptRoutes =
  require(
    "./routes/testAttemptRoutes"
  );
  const reelRoutes =
  require(
    "./routes/reelRoutes"
  );
  const subjectRoutes =
  require(
    "./routes/subjectRoutes"
  );
  const pyqRoutes =
  require(
    "./routes/pyqRoutes"
  );
  const videoRoutes =
  require(
    "./routes/videoRoutes"
  );
// Routes
app.use(
  "/api/admin",
  require("./routes/adminAuthRoutes")
);
app.use(
  "/api/upload",
  require("./routes/uploadRoutes")
);
app.use(
  "/api/exams",
  require("./routes/examRoutes")
);
app.use(
  "/api/courses",
  require("./routes/courseRoutes")
);
app.use("/api/teachers", require("./routes/teacherRoutes"));
app.use(
  "/api/tests",
  testRoutes
);
app.use(
  "/api/questions",
  questionRoutes
);
app.use(
  "/api/subjects",
  subjectRoutes
);
app.use("/api/auth", authRoutes);
app.use(
  "/api/test-attempt",
  testAttemptRoutes
);

app.use(
  "/api/reels",
  reelRoutes
);
app.use(

  "/api/pyqs",

  pyqRoutes

);
app.use(

  "/api/videos",

  videoRoutes

);

// Test Route
app.get("/", (req, res) => {
  res.send("API Running");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});