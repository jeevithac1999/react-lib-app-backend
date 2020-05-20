const express = require("express");
const User = require("../models/user");
const Book = require("../models/book");
const { generateHash, compareHash } = require("../utils/hash");
const { createToken } = require("../utils/loginTokenManager");

const userRouter = express.Router();

userRouter
  .post("/signup", async (req, res) => {
    try {
      const user = new User(req.body);
      user.password = generateHash(user.password);
      await user.save();
      const email = user.email;
      const jwtToken = createToken({ email });
      console.log(jwtToken);
      res.cookie("jwt", jwtToken);
      res.status(200).json({ status: "SUCCESS", jwtToken });
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Server Error");
    }
  })

  .post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).exec();
      if (user) {
        const result = await compareHash(password, user.password);
        if (result) {
          const jwtToken = createToken({ email });
          res.cookie("jwt", jwtToken);
          res.status(200).json({ status: "SUCCESS", jwtToken });
        } else {
          res.status(400).send("Invalid Request");
        }
      } else {
        res.status(400).send("Invalid Request");
      }
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Server Error");
    }
  })

  .post("/addToCart", async (req, res) => {
    try {
      const { id, currentUser: email } = req.body;
      const book = await Book.findOne({ _id: id }).exec();
      const user = await User.findOne({ email: email }).exec();
      if (book.copies > 0) {
        if (user.cart.includes(book.title)) {
          res.status(200).json({ status: "IN_CART" });
        } else {
          await Book.updateOne({ _id: id }, { $inc: { copies: -1 } }).exec();
          await User.updateOne(
            { email: email },
            { $addToSet: { cart: book.title } }
          ).exec();
          res.status(200).json({ status: "SUCCESS" });
        }
      } else {
        res.status(200).json({ status: "FAIL" });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Server Error");
    }
  })
  .post("/cart", async (req, res) => {
    try {
      const email = req.body.currentUser;
      const user = await User.findOne({ email: email }).exec();
      const books = user.cart;
      res.status(200).json({ books });
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Server Error");
    }
  })
  .post("/removeFromCart", async (req, res) => {
    try {
      const { bookName, currentUser: email } = req.body;
      const user = await User.findOne({ email: email }).exec();
      if (user.cart.includes(bookName)) {
        await User.updateOne(
          { email: email },
          { $pull: { cart: bookName } }
        ).exec();
        await Book.updateOne(
          { title: bookName },
          { $inc: { copies: 1 } }
        ).exec();
        res.status(200).json({ status: "SUCCESS" });
      } else {
        res.status(200).json({ status: "NOT_IN_CART" });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Server Error");
    }
  })
  .post("/borrowBooks", async (req, res) => {
    try {
      const { currentUser: email } = req.body;
      const user = await User.findOne({ email: email }).exec();
      const books = user.cart
      await User.updateOne({email: email}, {$addToSet : {booksBorrowed : [...books] }}).exec();
      await User.updateOne({email: email}, {$set: {cart : []}}).exec();
      res.status(200).json({status: "SUCCESS"})
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Server Error");
    }
  })
  .post("/returnBooks", async (req, res) => {
    try {
      const { bookName, currentUser: email } = req.body;
      const user = await User.findOne({ email: email }).exec();
      if (user.booksBorrowed.includes(bookName)) {
        await User.updateOne(
          { email: email },
          { $pull: { booksBorrowed: bookName } }
        ).exec();
        await Book.updateOne(
          { title: bookName },
          { $inc: { copies: 1 } }
        ).exec();
        res.status(200).json({ status: "SUCCESS" });
      } else {
        res.status(200).json({ status: "NOT_IN_CART" });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Server Error");
    }
  })
  .post("/profile", async (req,res) => {
    try{
      const email = req.body.currentUser;
      const user = await User.findOne({email: email}).exec();
      res.status(200).json({user})
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = userRouter;
