const mongoose = require("mongoose");

const AuthorSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true }
});
const AuthorModel = mongoose.model("author", AuthorSchema);
module.exports = AuthorModel;
