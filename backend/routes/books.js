var express = require("express");
var booksRouter = express.Router();

const bookModel = require("../models/bookModel");

booksRouter.get("/", async (req, res) => {
    const books = await bookModel.find({});
    res.json(books);
});

booksRouter.get("/:id", async (req, res) => {
    const book = await bookModel.findById(req.params.id);
    res.json(book);
});

booksRouter.post("/", async (req, res) => {
    const newBook = req.body;
    console.log(newBook)
    const addedBook = await bookModel.create(newBook);
    res.status(201).json(addedBook);
});

module.exports = booksRouter;
