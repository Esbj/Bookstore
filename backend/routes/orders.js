var express = require("express");
var orderRouter = express.Router();
const orderModel = require("../models/orderModel");

orderRouter.get("/", async (req, res) => {
    const orders = await orderModel.find({});
    res.json(orders);
});

orderRouter.post("/", async (req, res) => {
    const {
        firstName,
        lastName,
        address,
        phoneNumber,
        email,
        books,
        price,
        totalPrice,
        shippingMethod,
        paymentMethod,
    } = req.body;

    const newOrder = new orderModel({
        firstName,
        lastName,
        address,
        phoneNumber,
        email,
        books,
        price,
        totalPrice,
        shippingMethod,
        paymentMethod,
        status: "Pending",
    });

    try {
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.error("Failed to create order:", error);
        res.status(500).send("An error occurred");
    }
});

//Admin tools
orderRouter.put("/", async (req, res) => {
    const orderId = req.body.orderId;
    const updatedStatus = {
        status: req.body.status,
    };
    try {
        const order = await orderModel.findOne({ _id: orderId });

        if (!order) {
            return res.status(404).send("This order does not exist");
        } else {
            await bookModel.updateOne({ _id: orderId }, updatedStatus);
            res.send("Updated!");
        }
    } catch (error) {
        console.error("Failed to update status for order:", error);
        res.status(500).send("An error occurred");
    }
});

module.exports = orderRouter;
