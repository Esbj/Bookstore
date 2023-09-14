const mongoose = require("mongoose");
import bookModel from "./bookModel";

const AuthorSchema = mongoose.Schema({
    name: String,
    books: [bookModel],
});
const AuthorModel = mongoose.model("author", AuthorSchema);
module.exports = AuthorModel;
