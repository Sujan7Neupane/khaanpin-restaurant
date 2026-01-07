import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Parse allowed origins from env
// const allowedOrigins = process.env.CORS_ORIGIN.split(",");

// console.log(allowedOrigins);

// for cors origin error
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));

// cookie parser
app.use(cookieParser());

// to store static files like images
app.use(express.static("public"));

// for future API hosting
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running" });
});

// Routes
import userRouter from "./routes/user.routes.js";
import menuRouter from "./routes/menu.routes.js";
import dishRouter from "./routes/dish.route.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";

// for user login/registration
app.use("/api/v1/user", userRouter);

// menu lists
app.use("/api/v1/menu", menuRouter);

// all the dishes
app.use("/api/v1/dish", dishRouter);

// cart route
app.use("/api/v1/cart", cartRouter);

// order route
app.use("/api/v1/order", orderRouter);

export { app };
