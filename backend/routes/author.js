const express = require('express');
const authorRouter = express.Router();

const authorModel = require('../models/authorModel');
const bookModel = require('../models/bookModel');

//get all authors
authorRouter.get('/', async (req, res) => {
  const authors = await authorModel.find();
  res.json(authors)
});


//get books published by an author
authorRouter.get("/:id/books", async (req, res) => {
  try {

    const authorId = req.params.id
    const foundAuthor = await authorModel.findById(authorId);
    console.log(foundAuthor)
    const books = await bookModel.find({ author: foundAuthor.name })
    console.log(books)
    res.json(books)
  } catch (error) {
    res.json({ "message": error.message })
  }
})
module.exports = authorRouter;
