const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    isbn: { type: String, required: true },
});
const BooksModel = mongoose.model("book", BookSchema);
module.exports = BooksModel;
