const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    price: Number,
});

module.exports = mongoose.model("book", BookSchema);
