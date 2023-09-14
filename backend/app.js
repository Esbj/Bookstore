require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const ordersRouter = require("./routes/orders");
const booksRouter = require("./routes/books");
var cors = require("cors");
var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

async function run() {
    try {
        mongoose.connect(process.env.MONGODB_CONNECTIONSTRING, {
            useUnifiedTopology: true,
        });
        console.log("Connected to database");
    } catch (error) {
        console.error(error);
    }
}

app.use("/orders", ordersRouter);
app.use("/books", booksRouter);
run();

module.exports = app;
