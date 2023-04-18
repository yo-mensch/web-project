const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/bookmarker', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define the schema for the bookmarks
const bookmarkSchema = new mongoose.Schema({
  url: String,
  title: String,
  description: String,
  thumbnail: String,
  category: String,
  userId: String
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

// Define the routes
app.get('/bookmarks', (req, res) => {
  Bookmark.find({ userId: req.query.userId }, (err, bookmarks) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(bookmarks);
    }
  });
});

app.post('/bookmarks', (req, res) => {
  const bookmark = new Bookmark(req.body);
  bookmark.save((err, savedBookmark) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(savedBookmark);
    }
  });
});

app.put('/bookmarks/:id', (req, res) => {
  Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedBookmark) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(updatedBookmark);
    }
  });
});

app.delete('/bookmarks/:id', (req, res) => {
  Bookmark.findByIdAndRemove(req.params.id, (err, deletedBookmark) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(deletedBookmark);
    }
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
