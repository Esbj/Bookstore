const mongoose = require("mongoose")
import bookModel from "./bookModel";


const OrderSchema = mongoose.Schema({ 
    firstName: String,
    lastName: String,
    address: {zip: String, streetAddress: String, city: String},
    phoneNumber: String,
    email: String,
    books: [bookModel],
    price: Number,
})

module.exports = mongoose.model("order", OrderSchema);