const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    isbn: { type: String },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
        required: true,
    }
});
const BooksModel = mongoose.model("book", BookSchema);
module.exports = BooksModel;
