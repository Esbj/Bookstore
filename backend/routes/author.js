const express = require('express');
const authorRouter = express.Router();

const authorModel = require('../models/authorModel');
const bookModel = require('../models/bookModel');

authorRouter.get('/', async (req, res) => {
  const authors = await authorModel.find();
  res.json(authors)
});


authorRouter.get('/:bookId/', async (req, res) => {
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

module.exports = authorRouter;
