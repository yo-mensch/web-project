const express = require('express');
const bodyParser = require('body-parser');
const { Bookmark } = require('../db/bookmarkSchema');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
      const bookmarks = await Bookmark.find({ userId: req.query.userId });
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
  

module.exports = app;
