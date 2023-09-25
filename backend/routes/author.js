const express = require('express');
const authorRouter = express.Router();

const authorModel = require('../models/authorModel');
const bookModel = require('../models/bookModel');

authorRouter.get('/', async (req, res) => {
  const authors = await authorModel.find();
  res.json(authors)
});


authorRouter.get('/:id/books', async (req, res) => {
  try {
    const id = req.params.id;
    const author = await authorModel.findById(id)
    const books = await bookModel.find({ author: author.name });
    res.json(books)
  }
  catch (error) {
    console.error(error)
    res.status(500).json({ message: `Error: ${error}` })
  }
});

module.exports = authorRouter;
