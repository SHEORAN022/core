// const dotenv = require("dotenv");
// dotenv.config();

// const express = require("express");
// const cors = require("cors");

// const connectDB = require("./config/db");

// const app = express();

// // ================================
// // DATABASE CONNECTION
// // ================================
// connectDB();

// // ================================
// // MIDDLEWARE
// // ================================
// app.use(cors());

// app.use(express.json());

// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );

// // ================================
// // ROUTES IMPORT
// // ================================
// const questionRoutes = require("./routes/questionRoutes");
// const testRoutes = require("./routes/testRoutes");
// const authRoutes = require("./routes/authRoutes");
// const testAttemptRoutes = require("./routes/testAttemptRoutes");
// const reelRoutes = require("./routes/reelRoutes");
// const subjectRoutes = require("./routes/subjectRoutes");
// const pyqRoutes = require("./routes/pyqRoutes");
// const videoRoutes = require("./routes/videoRoutes");
// const categoryRoutes = require("./routes/categoryRoutes");
// const continueWatchingRoutes =
//   require(
//     "./routes/continueWatchingRoutes"
//   );
//   app.use(
//   "/api/continue-watching",
//   continueWatchingRoutes
// );
// const downloadedLectureRoutes =
//   require(
//     "./routes/downloadedLectureRoutes"
//   );
//   const reelLikeRoutes =
//   require(
//     "./routes/reelLikeRoutes"
//   );
//   const upcomingTestRoutes =
//   require(
//     "./routes/upcomingTestRoutes"
//   );

// // ================================
// // API ROUTES
// // ================================

// // ADMIN
// app.use(
//   "/api/admin",
//   require("./routes/adminAuthRoutes")
// );

// // UPLOAD
// app.use(
//   "/api/upload",
//   require("./routes/uploadRoutes")
// );

// // EXAMS
// app.use(
//   "/api/exams",
//   require("./routes/examRoutes")
// );

// // COURSES
// app.use(
//   "/api/courses",
//   require("./routes/courseRoutes")
// );

// // TEACHERS
// app.use(
//   "/api/teachers",
//   require("./routes/teacherRoutes")
// );

// // TESTS
// app.use(
//   "/api/tests",
//   testRoutes
// );

// // QUESTIONS
// app.use(
//   "/api/questions",
//   questionRoutes
// );

// // SUBJECTS
// app.use(
//   "/api/subjects",
//   subjectRoutes
// );

// // AUTH
// app.use(
//   "/api/auth",
//   authRoutes
// );

// // TEST ATTEMPTS
// app.use(
//   "/api/test-attempt",
//   testAttemptRoutes
// );

// // REELS
// app.use(
//   "/api/reels",
//   reelRoutes
// );

// // PYQS
// app.use(
//   "/api/pyqs",
//   pyqRoutes
// );

// // VIDEOS
// app.use(
//   "/api/videos",
//   videoRoutes
// );

// // CATEGORIES
// app.use(
//   "/api/categories",
//   categoryRoutes
// );

// // TOP VIDEOS
// app.use(
//   "/api/top-videos",
//   require("./routes/topVideoRoutes")
// );

// // SECTIONS
// app.use(
//   "/api/sections",
//   require("./routes/sectionRoutes")
// );

// // APP SETTINGS
// app.use(
//   "/api/app",
//   require("./routes/appRoutes")
// );

// // NEW ARRIVALS
// app.use(
//   "/api/new-arrivals",
//   require("./routes/newArrivalRoutes")
// );

// // app.use( "/api/reel-model", require( "./routes/reelModelRoutes" ) );
// app.use(

//   "/api/save-reels",

//   require(
//     "./routes/saveReelRoutes"
//   ));
//   app.use(

//   "/api/downloaded-lectures",

//   downloadedLectureRoutes

// );
// app.use(

//   "/api/reel-likes",

//   reelLikeRoutes

// );
// app.use(

//   "/api/upcoming-tests",

//   upcomingTestRoutes

// );
// // ================================
// // TEST ROUTE
// // ================================
// app.get("/", (req, res) => {
//   res.send("API Running...");
// });

// // ================================
// // SERVER
// // ================================
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();


// ========================================
// DATABASE CONNECTION
// ========================================

connectDB();


// ========================================
// MIDDLEWARE
// ========================================

// app.use(cors());
app.use(
  cors({
    origin: [
      "https://lavender-hare-239108.hostingersite.com",
      "http://localhost:3000",
      "http://localhost:5173",
       "http://localhost:3001",
    ],
    credentials: true
  })
);
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


// ========================================
// ROUTES IMPORT
// ========================================

// AUTH
const authRoutes =
  require("./routes/authRoutes");

const adminAuthRoutes =
  require("./routes/adminAuthRoutes");


// EXAMS / SUBJECTS / CHAPTERS / TOPICS
const examRoutes =
  require("./routes/examRoutes");

const subjectRoutes =
  require("./routes/subjectRoutes");

const chapterRoutes =
  require("./routes/chapterRoutes");

const topicRoutes =
  require("./routes/topicRoutes");


// REELS
const reelRoutes =
  require("./routes/reelRoutes");

const saveReelRoutes =
  require("./routes/saveReelRoutes");

const reelLikeRoutes =
  require("./routes/reelLikeRoutes");


// TEACHERS
const teacherRoutes =
  require("./routes/teacherRoutes");


// TESTS
const testRoutes =
  require("./routes/testRoutes");

const questionRoutes =
  require("./routes/questionRoutes");

const testAttemptRoutes =
  require("./routes/testAttemptRoutes");

const upcomingTestRoutes =
  require("./routes/upcomingTestRoutes");


  const reelEngagementRoutes =
  require("./routes/reelEngagementRoutes");
// VIDEOS
const videoRoutes =
  require("./routes/videoRoutes");

const topVideoRoutes =
  require("./routes/topVideoRoutes");


// PYQS
const pyqRoutes =
  require("./routes/pyqRoutes");


// COURSES
const courseRoutes =
  require("./routes/courseRoutes");


// CATEGORIES
const categoryRoutes =
  require("./routes/categoryRoutes");


// APP
const appRoutes =
  require("./routes/appRoutes");


// SECTIONS
const sectionRoutes =
  require("./routes/sectionRoutes");


// NEW ARRIVALS
const newArrivalRoutes =
  require("./routes/newArrivalRoutes");


// CONTINUE WATCHING
const continueWatchingRoutes =
  require("./routes/continueWatchingRoutes");


// DOWNLOADED LECTURES
const downloadedLectureRoutes =
  require("./routes/downloadedLectureRoutes");


// UPLOAD
const uploadRoutes =
  require("./routes/uploadRoutes");


// ========================================
// API ROUTES
// ========================================


// ========================================
// AUTH ROUTES
// ========================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/admin",
  adminAuthRoutes
);


// ========================================
// UPLOAD ROUTES
// ========================================

app.use(
  "/api/upload",
  uploadRoutes
);


// ========================================
// EXAM HIERARCHY ROUTES
// ========================================

app.use(
  "/api/exams",
  examRoutes
);

app.use(
  "/api/subjects",
  subjectRoutes
);

app.use(
  "/api/chapters",
  chapterRoutes
);

app.use(
  "/api/topics",
  topicRoutes
);


// ========================================
// TEACHER ROUTES
// ========================================

app.use(
  "/api/teachers",
  teacherRoutes
);


// ========================================
// REEL ROUTES
// ========================================

app.use(
  "/api/reels",
  reelRoutes
);

app.use(
  "/api/save-reels",
  saveReelRoutes
);

app.use(
  "/api/reel-likes",
  reelLikeRoutes
);


// ========================================
// TEST ROUTES
// ========================================

app.use(
  "/api/tests",
  testRoutes
);

app.use(
  "/api/questions",
  questionRoutes
);

app.use(
  "/api/test-attempt",
  testAttemptRoutes
);

app.use(
  "/api/upcoming-tests",
  upcomingTestRoutes
);

app.use(
  "/api/reel-engagement",
  reelEngagementRoutes
);

// ========================================
// VIDEO ROUTES
// ========================================

app.use(
  "/api/videos",
  videoRoutes
);

app.use(
  "/api/top-videos",
  topVideoRoutes
);


// ========================================
// PYQ ROUTES
// ========================================

app.use(
  "/api/pyqs",
  pyqRoutes
);


// ========================================
// COURSE ROUTES
// ========================================

app.use(
  "/api/courses",
  courseRoutes
);


// ========================================
// CATEGORY ROUTES
// ========================================

app.use(
  "/api/categories",
  categoryRoutes
);


// ========================================
// SECTION ROUTES
// ========================================

app.use(
  "/api/sections",
  sectionRoutes
);


// ========================================
// APP SETTINGS ROUTES
// ========================================

app.use(
  "/api/app",
  appRoutes
);


// ========================================
// NEW ARRIVAL ROUTES
// ========================================

app.use(
  "/api/new-arrivals",
  newArrivalRoutes
);


// ========================================
// CONTINUE WATCHING ROUTES
// ========================================

app.use(
  "/api/continue-watching",
  continueWatchingRoutes
);


// ========================================
// DOWNLOADED LECTURE ROUTES
// ========================================

app.use(
  "/api/downloaded-lectures",
  downloadedLectureRoutes
);
app.use(
  "/api/assessments",
  require("./routes/assessmentRoutes")
);

app.use(
  "/api/leaderboard",
  require("./routes/leaderboardRoutes")
);

// ========================================
// TEST ROUTE
// ========================================

app.get("/", (req, res) => {
  res.send("🚀 API Running...");
});


// ========================================
// 404 ROUTE
// ========================================

app.use((req, res) => {

  res.status(404).json({

    success: false,

    message: "Route Not Found",

  });

});

// ========================================
// GLOBAL ERROR HANDLER
// ========================================

app.use((err, req, res, next) => {

  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });

});


// ========================================
// SERVER
// ========================================

const PORT =
  process.env.PORT || 5004;

app.listen(PORT, () => {

  console.log(
    `🚀 Server running on port ${PORT}`
  );

});

