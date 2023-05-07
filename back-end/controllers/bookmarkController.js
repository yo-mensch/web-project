const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { Bookmark } = require('../db/bookmarkSchema');
const User = require('../db/userSchema');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', authenticateToken, async (req, res) => {
    try {
      console.log(req);
      const bookmarks = await Bookmark.find({ userId: req.userId });
      res.json(bookmarks);
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
});
  
app.post('/', async (req, res) => {
    try {
      const bookmark = new Bookmark(req.body);
      const savedBookmark = await bookmark.save();
      res.json(savedBookmark);
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
});
  
app.put('/:id', async (req, res) => {
    try {
      const updatedBookmark = await Bookmark.findByIdAndUpdate(req.params._id, req.body, { new: true });
      res.json(updatedBookmark);
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
});
  
app.delete('/:id', async (req, res) => {
    try {
      const deletedBookmark = await Bookmark.findByIdAndRemove(req.params._id);
      res.json(deletedBookmark);
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.userId = decoded.userId;
    console.log(decoded.userId);
    next();
  });
}

module.exports = app;
