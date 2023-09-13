const mongoose = require("mongoose");
import bookModel from "./bookModel";

const AuthorSchema = mongoose.Schema({
    name: String,
    books: [bookModel],
});

module.exports = mongoose.model("author", AuthorSchema);
