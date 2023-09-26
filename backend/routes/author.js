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
authorRouter.get("books/:id", (req, res) => {
  const authorId = req.params.id
  const author = authorModel.findById(authorId);
})
module.exports = authorRouter;
