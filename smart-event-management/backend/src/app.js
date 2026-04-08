const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");
const notFoundMiddleware = require("./middleware/notfoundmiddleware");
const errorMiddleware = require("./middleware/errormiddleware");

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        credentials: true
    })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Smart Event Management Backend API is running"
    });
});

app.use("/api", routes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;