const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    firstName: String,
    lastName: String,
    address: { zip: String, streetAddress: String, city: String },
    phoneNumber: String,
    email: String,
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "book",
        },
    ],
    totalPrice: Number,
    shippingMethod: String,
    paymentMethod: String,
    status: String,
});

module.exports = mongoose.model("order", OrderSchema);
