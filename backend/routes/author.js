var express = require("express");
var authorRouter = express.Router();

const authorModel = require("../models/authorModel");

authorRouter.get("/", async (req, res) => {
    const author = await authorModel.find();
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: "Author not found" });
      console.log("There are no author with this name");
    }
  });


module.exports = authorRouter;