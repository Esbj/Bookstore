var express = require("express");
var booksRouter = express.Router();
const authorModel = require("../models/authorModel");
const bookModel = require("../models/bookModel");


//get all books
booksRouter.get("/", async (req, res) => {
  const books = await bookModel.find({});
  res.json(books);
});

//get book by id
booksRouter.get("/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await bookModel.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const authorNane = book.author;
    const author = await authorModel.findOne({ name: authorNane })

    if (!author) {
      return res.status(500).json({ message: `Error: No author for book with id: ${book.id}` });
    }

    res.json({ book, author });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error" });
  }
});

//get other books by same author
booksRouter.get('/:bookId/same-author/', async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const book = await bookModel.findById(bookId)
    const booksByAuthor = await bookModel.find({ author: book.author })
    res.json(booksByAuthor)
  }
  catch (error) {
    console.error(error)
    res.status(500).json({ message: `Error: ${error}` })
  }
});

// create new book
booksRouter.post("/", async (req, res) => {
  const newBook = req.body;
  const existingBook = await bookModel.findOne({ isbn: newBook.isbn })
  if (!existingBook) {
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
  } else {
    res.status(409).send("Book already exists")
  }

});


// remove book
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


//update book
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
