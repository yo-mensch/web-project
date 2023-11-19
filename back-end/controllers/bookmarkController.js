const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { Bookmark } = require("../db/bookmarkSchema");
const User = require("../db/userSchema");
const bookmarkValidator = require("../validators/bookmarkValidator");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", authenticateToken, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.body.userId });
    res.json(bookmarks);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/", authenticateToken, async (req, res) => {
  try {
    if (bookmarkValidator.isValidUrl(req.body.url)) {
      const bookmark = new Bookmark(req.body);
      const savedBookmark = await bookmark.save();
      res.json(savedBookmark);
    } else {
      res.status(400).send("Please enter a valid URL");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/:_id", authenticateToken, async (req, res) => {
  try {
    if (bookmarkValidator.isValidUrl(req.body.url)) {
      const updatedBookmark = await Bookmark.findByIdAndUpdate(
        req.params._id,
        req.body,
        { new: true }
      );
      res.json(updatedBookmark);
    } else {
      res.status(400).send("Please enter a valid URL");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/:_id", authenticateToken, async (req, res) => {
  try {
    const query = { _id: req.params._id };
    const deletedBookmark = await Bookmark.deleteOne(query);
    res.json(deletedBookmark);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.body.userId = decoded.userId;
    next();
  });
}

module.exports = app;
