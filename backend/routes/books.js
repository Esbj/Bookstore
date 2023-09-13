var express = require("express");
var router = express.Router();

const bookModel = require("../models/bookModel");

router.get("/", async (req, res) => {
    const books = await bookModel.find({});
    res.json(books);
});

router.get("/:id", async (req, res) => {
    const book = await bookModel.findById(req.params.id);
    res.json(book);
});

router.post("/", async (req, res) => {
    const newBook = req.body;
    const addedBook = await PostModel.bookModel(newBook);
    res.status(201).json(addedBook);
  });

module.exports = router;
