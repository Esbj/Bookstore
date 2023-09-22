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
      _id: String,
      title: String,
      author: String,
      description: String,
      price: Number,
      isbn: String,
      quantity: Number,
    },
  ],
  totalPriceWithShipping: Number,
  shippingMethod: [
    {
      shippingMethod: {
        type: Map,
        of: {
          cost: Number,
          shippingTime: Number,
          expectedDelivery: String,
        },
      },
    },
  ],
  paymentMethod: {
    type: {
      type: String,
      enum: ["swish", "card"],
      required: true,
    },
    details: {
      phone: String,
      name: String,
      cardNumber: String,
      CVC: String,
    },
  },

  status: String,
});

module.exports = mongoose.model("order", OrderSchema);
