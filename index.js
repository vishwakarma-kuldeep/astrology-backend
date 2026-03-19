// var createError = require("http-errors");
// var express = require("express");
// var bodyParser = require("body-parser");
// var path = require("path");
// var cookieParser = require("cookie-parser");
// var cors = require("cors");
// var logger = require("morgan");
// var multer = require("multer");

// // Db Connection
// const dbConnection = require("./lib/db");

// // Import Routes
// const userRouter = require("./routes/user");
// const adminRouter = require("./routes/admin");
// const categoryRouter = require("./routes/category");
// // const subCategoryRouter = require("./routes/subcategory");
// const productRouter = require("./routes/product");
// const paymentRouter = require("./routes/payment");
// const orderRouter = require("./routes/order");
// const cartRouter = require("./routes/cart");
// const jyotisRouter = require("./routes/jyotis");
// const appointmentRouter = require("./routes/appointment");
// const horoscopeRouter = require("./routes/horoscope");
// const cardRouter = require("./routes/card");
// const planRouter = require("./routes/plan");
// const subscriptionRouter = require("./routes/subscription");
// const galleryRouter = require("./routes/gallery");
// const feedback = require("./routes/feedback");
// const auth = require("./middlewares/auth");
// const kundaliRouter = require("./routes/kundali");

// dbConnection();
// var app = express();

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
//   next();
// });

// app.use(logger("dev"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer().any());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   }),
// );

// // Request Logger
// // if (app.get("env") === "development") {
// app.use(logger("dev"));
// // }

// // Place your routes here
// app.use("/api/user", userRouter);
// app.use("/api/admin", adminRouter);
// app.use("/api/category", categoryRouter);
// // app.use("/api/sub-category", subCategoryRouter);
// app.use("/api/products", productRouter);
// app.use("/api/payment", paymentRouter);
// app.use("/api/order", orderRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/jyotis", jyotisRouter);
// app.use("/api/appointment", appointmentRouter);
// app.use("/api/horoscope", horoscopeRouter);
// app.use("/api/card", cardRouter);
// app.use("/api/plan", planRouter);
// app.use("/api/subscription", subscriptionRouter);
// app.use("/api/gallery", galleryRouter);
// app.use("/api/cms", feedback);
// app.use("/api/kundali", kundaliRouter);

// app.get("/api/check-auth", auth.authenticateToken, async (req, res) => {
//   try {
//     return res.status(200).json({ message: "Token is valid" });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: err.message });
//   }
// });

// // Health check
// app.get("/health-check", (req, res) => {
//   res.status(200).json({ message: "Server is running" });
// });

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// // app.use(function (err, req, res, next) {
// //   // set locals, only providing error in development
// //   res.locals.message = err.message;
// //   res.locals.error = req.app.get("env") === "development" ? err : {};

// //   // render the error page
// //   res.status(err.status || 500);
// // });

// app.use((req, res) => {
//   res.status(404).json({
//     message: "Route not found",
//   });
// });
// module.exports = app;

var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var logger = require("morgan");
var helmet = require("helmet");
var rateLimit = require("express-rate-limit");

// DB
const dbConnection = require("./lib/db");

const auth = require("./middlewares/auth");
const rootRoute = require("./routes");

dbConnection();

const app = express();

// 🔐 Security
app.use(helmet());

// 🚦 Rate limit
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
  }),
);

// 🪵 Logger
app.use(logger("dev"));

// 🧠 Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// 🍪 Cookies
app.use(cookieParser());

// 🌍 CORS
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

// ================= ROUTES =================

app.use("/api", rootRoute);

// 🔐 Auth check
app.get("/api/check-auth", auth.authenticateToken, (req, res) => {
  res.status(200).json({ message: "Token is valid" });
});

// ❤️ Health check
app.get("/health-check", (req, res) => {
  res.status(200).json({ message: "Everything is working fine" });
});

// ================= ERROR =================

// 404
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

// Global error
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ================= SERVER START =================

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
