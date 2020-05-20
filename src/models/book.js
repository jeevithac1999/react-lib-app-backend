const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const bookSchema = new Schema({
 

  title: {
    type: String,
    required: true
  },
  author:{
    type: String,
    required: true
  },
  copies: {
    type: Number,
    required: true
  },
  description: {
    type: String,
  },
  ISBN:{
    type: String,
    required: true
  }

});

const Book = model("Book", bookSchema);

module.exports = Book;
