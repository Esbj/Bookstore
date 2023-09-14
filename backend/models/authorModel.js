const mongoose = require("mongoose");
const { Schema } = mongoose;


const AuthorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    books: [{
        type: String,
        ref: "Book",
    }]
 

});
const AuthorModel = mongoose.model("author", AuthorSchema);
module.exports = AuthorModel;
