const express = require('express');
const authorRouter = express.Router();

const authorModel = require('../models/authorModel');
const bookModel = require('../models/bookModel');

authorRouter.get('/', async (req, res) => {
  try {
    const authors = await authorModel.find();
    const authorsWithBooks = [];
    for (const author of authors) {
      const books = await bookModel.find({ author: author.name });
      const authorWithBooks = { ...author.toObject(), books };
      authorsWithBooks.push(authorWithBooks);
    }
    res.status(200).json(authorsWithBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = authorRouter;
