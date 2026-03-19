// this is the root route
const express = require("express");
//
const userRouter = require("./user");
const adminRouter = require("./admin");
const categoryRouter = require("./category");
const productRouter = require("./product");
const paymentRouter = require("./payment");
const orderRouter = require("./order");
const cartRouter = require("./cart");
const jyotisRouter = require("./jyotis");
const appointmentRouter = require("./appointment");
const horoscopeRouter = require("./horoscope");
const cardRouter = require("./card");
const planRouter = require("./plan");
const subscriptionRouter = require("./subscription");
const galleryRouter = require("./gallery");
const feedback = require("./feedback");
const kundaliRouter = require("./kundali");

const rootRoute = express.Router();

rootRoute.use("/user", userRouter);
rootRoute.use("/admin", adminRouter);
rootRoute.use("/category", categoryRouter);
rootRoute.use("/products", productRouter);
rootRoute.use("/payment", paymentRouter);
rootRoute.use("/order", orderRouter);
rootRoute.use("/cart", cartRouter);
rootRoute.use("/jyotis", jyotisRouter);
rootRoute.use("/appointment", appointmentRouter);
rootRoute.use("/horoscope", horoscopeRouter);
rootRoute.use("/card", cardRouter);
rootRoute.use("/plan", planRouter);
rootRoute.use("/subscription", subscriptionRouter);
rootRoute.use("/gallery", galleryRouter);
rootRoute.use("/cms", feedback);
rootRoute.use("/kundali", kundaliRouter);

module.exports = rootRoute;
