var express = require("express");
var booksRouter = express.Router();
const authorModel = require("../models/authorModel");
const bookModel = require("../models/bookModel");

booksRouter.get("/", async (req, res) => {
    const books = await bookModel.find({});
    res.json(books);
});

booksRouter.get("/:id", async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await bookModel.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        const authorId = book.author;
        const author = await authorModel.findOne({name: authorName});

        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }

        res.json({ book, author });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error" });
    }
});

booksRouter.post("/", async (req, res) => {
    const newBook = req.body;
    const addedBook = await bookModel.create(newBook);

    const author = await authorModel.findOne({ name: newBook.author });
    if (!author) {
        const newAuthor = new authorModel({
            name: newBook.author,
            books: [addedBook],
        });
        await newAuthor.save();
    } else {
        author.books.push(addedBook);
        await author.save();
    }

    res.status(201).json(addedBook);
});

booksRouter.delete("/", async (req, res) => {
    const bookId = req.body.bookId;

    try {
        const book = await bookModel.findOne({ _id: bookId });

        if (!book) {
            return res.status(404).send("Book does not exist");
        } else {
            await bookModel.deleteOne({ _id: bookId });
            res.send("deleted");
        }
    } catch (error) {
        console.error("Failed to delete book:", error);
        res.status(500).send("An error occurred");
    }
});

booksRouter.put("/", async (req, res) => {
    const bookId = req.body.bookId;
    const updatedBook = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
    };
    try {
        const book = await bookModel.findOne({ _id: bookId });

        if (!book) {
            return res.status(404).send("Book does not exist");
        } else {
            await bookModel.updateOne({ _id: bookId }, updatedBook);
            res.send("Updated!");
        }
    } catch (error) {
        console.error("Failed to update book:", error);
        res.status(500).send("An error occurred");
    }
});

module.exports = booksRouter;
