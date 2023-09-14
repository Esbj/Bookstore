const mongoose = require("mongoose");
const { Schema } = mongoose;


const AuthorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: "Book",
    }]
 

});
const AuthorModel = mongoose.model("author", AuthorSchema);
module.exports = AuthorModel;
