const express = require("express");
const Book = require("../models/book");

const bookRouter = express.Router();

bookRouter.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({ books });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = bookRouter;
